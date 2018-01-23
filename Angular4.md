--第一章学习
    * Angular程序架构
        + 组件（component）：angular应用的基本构建块，理解为一段带有业务逻辑和数据的HTML；组件可以进行嵌套
        + 服务（service）：用来封装可以重用的业务逻辑；
        + 指令（ng）：允许你向html元素添加自定义行为
        + 模块 ：用来将应用中不同的部分组织成一个angular框架可以理解的单元；
    * angular的环境搭建
        + node.js 环境安装
        + 安装angular-cli 
            （c）npm install -g @angular/cli （Windows下安装 cmd下才能运行 power shell下会报错）  
                sudo npm install -g angular-cli （macOS）
       
        + angular目录结构        
            - e2e 用于测试的部分
            - src 源代码目录
                - app 用来存放我们写的组件模块之类的东西
                - assets 用来存放一些静态资源 比如图片等
                - environments 环境配置（开发环境，生产环境）
                - index.html 启动的根文件
                - main.ts 脚本启动点
                - polyfills.ts 导入一些必要的库，便于兼容以前的老版浏览器
                - style.css  全局样式
                - test.ts 自动化测试

            - angular-cli.json  ng配置文件
            - .gitignore git配置不用跟踪的文件          
            - .karma.conf.js karma的配置文件
            - package.json npm的配置文件
            - tslint.json  typeScript的语法检查

        + angular的应用启动
            - 启动时加载了哪些页面？
                
            - 启动时加载了哪些脚本？
            - 这些脚本做了什么事？    

    第三章 angular route导航 （angular是单页面应用） ng g projectname router
    路由的基础知识：
        - 路由相关的对象介绍
            Routes（路由数组）    路由配置，保存着那个URL对应着的组件，以及在RouterOutlet中展示组件 
            RouterOutlet（路由出口）     在html中标记路由内容出现的位置的占位符指令
            Router      负责在路由运行时执行路由的对象，可以通过调用其navigate（）和navigateByUrl()方法来导航到一个指定的路由
            RouterLink（路由链接）   该指令用来把一个可点击的HTML元素绑定到路由
            ActivatedRoute（激活的路由） 为每个路由组件提供提供的一个服务，它包含特定于路由的信息，比如路由参数、静态数据、解析数据、全局查询参数和全局碎片（fragment）。

        - 路由时的数据传递
            - 在查询参数中传递数据
                /product？id=1&name=2   => ActivatedRoute.queryParams[id]  
            - 在路由路径中传递数据
                {path：/product/:id} => /product/1 => ActivatedRoute.Params[id]  
            - 在路由配置中传递数据
                { path: '/product', component: component, data:[{isprod:true}] 
                        => ActivatedRoute.data[0][isprod] 

            snapshot 快照   subscribe  订阅            
            
        - 重定向路由
            *  将一个地址，将其重新定向到另一个指定的地址
                routing文件  { path: '', redirectTo: '/home', pathMatch: 'full' }  redirectTo指向的文件即为指向的地址

        
        - 子路由 
            在一个路由器中嵌套其他的路由
            { path: 'home', name: '', component: homecomponent,
                children: [
                    { path: 'xxx', component: xxxcomponent }， 在展示homecomponent的情况下，同时展现xxx的模板
                    { path: 'yyy', component: Yyycomponent }   在展示homecomponent的情况下，同时展现yyy的模板
                ]
                ]
            }
        - 辅助路由
            在html中设置：
            <router-outlet name="aut"></router-outlet>

            在app-routing.module.ts文件中：
            { path: 'xx', component: xxxxComponent,outlet:'aut' },   
            { path: 'yyy', component: yyyComponent,outlet:'aut' }, 

            链接设置上： 第一个为主路由的设置路径，第二个为辅助路由的路径
            <a [routerLink]="['/product',{outlets:{aut:'xx'}}]">ssss</a>
            <a [routerLink]="['/product',{outlets:{aut:'yyy'}}]">yyyyy</a>

        - 路由守卫
                运用于一些特殊的情景判定  路由生命钩子
            + 如 只有当用户满足某些特定条件后才能登陆或者进入某些路由中
            +    不如多个表单组成的向导，如 注册流程之类的，只有当前页面操作完成后才能到另一个界面
            +    当用户执行某个操作而未保存且离开当前路由时，提醒用户
            canActivate 处理导航到某路由的情况
                1.进行路由守卫的配置  声明一个类 用以实现canActivate接口
                    export class LoginGuard implements CanActivate {
                        canActivate() {
                            const loggedIn: boolean = Math.random() < 0.5 ;
                            if (!loggedIn) {
                                console.log('用户未登录');
                            }
                            return loggedIn;
                        }
                    }
                2. path路径中 在需要守卫的路由中添加，canActivate：[loginguard]  数组的形式可以加入多个守卫 同时满足时才生效    
                3. @NgModule({      //初始化中，配置providers属性 
                        imports: [RouterModule.forRoot(routes)], // { enableTracing: true }可以观测它会把每个导航生命周期中的事件输出到浏览器的控制台
                        exports: [RouterModule],
                        providers: [LoginGuard, UnsavedGuard]
                    })


            CanDeactivate 处理从当前路由离开的情况
                1.进行路由守卫的配置  声明一个类 用以实现canActivate接口，用泛型指定到对应的组件
                   export class UnsavedGuard implements CanDeactivate<ProductComponent> {
                            canDeactivate(component: ProductComponent) {
                                    return window.confirm('你还未保存，是否确定要离开？');
                            }
                    }
                2. path路径中 在需要守卫的路由中添加，CanDeactivate：[loginguard]  数组的形式可以加入多个守卫 同时满足时才生效    
                3. @NgModule({      //初始化中，配置providers属性 
                        imports: [RouterModule.forRoot(routes)], // { enableTracing: true }可以观测它会把每个导航生命周期中的事件输出到浏览器的控制台
                        exports: [RouterModule],
                        providers: [LoginGuard, UnsavedGuard]
                    })

            Resolve  在路由激活之前获取路由数据
                 nDeactivate 处理从当前路由离开的情况
                1.进行路由守卫的配置  声明一个类 用以实现Resolve接口，用泛型指定到对应的组件
                  @Injectable()
                    export class ProductResolve implements Resolve<Product> {
                            constructor(private router: Router) {

                            }
                            resolve(
                                    route: ActivatedRouteSnapshot,
                                    state: RouterStateSnapshot
                            ): Observable<Product>|Promise<Product>|Product  {
                                    const productId: number = route.params['id'];
                                    console.log(typeof productId)
                                    if (productId == 1) {
                                            return new Product(10, 'iphoneX');
                                    }else {
                                            console.log(123)
                                            this.router.navigate(['/home']);
                                            return undefined;
                                    }
                            }
                    }
                2. path路径中 在需要守卫的路由中添加，resolve：{product:ProductResolve} 对象的形式，传入想传入的对象，value为执行他的对象    
                3.在对应的组建中，声明相应的接受对象 
                    export class ProductComponent implements OnInit {
                        private productId: number;
                        private productName: string;
                        constructor(private routeInfo: ActivatedRoute) { }

                        ngOnInit() {
                            this.routeInfo.params.subscribe((params: Params) => this.productId = params['id']);
                            // this.productId = this.routeInfo.snapshot.params['id'];
                            this.routeInfo.data.subscribe((data: {product: Product}) => {
                            this.productId = data.product.id;
                            this.productName = data.product.name;
                            });
                        }

                        }
                        export class Product {
                        constructor(public id: number, public name: string) {

                        }
                    }
                @NgModule({      //初始化中，配置providers属性 
                        imports: [RouterModule.forRoot(routes)], // { enableTracing: true }可以观测它会把每个导航生命周期中的事件输出到浏览器的控制台
                        exports: [RouterModule],
                        providers: [LoginGuard, UnsavedGuard,ProductResolvey]
                    })   
