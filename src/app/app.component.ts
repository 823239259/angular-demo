  import { Component } from '@angular/core';
/*
组件的必备元素：
  1.装饰器 @component（） ng框架 如何处理typescript类
    属性的值叫做元数据，根据元数据的值渲染组件，来处理逻辑
  2.模板 Template
  3.控制器 Controller  与模板进行双向绑定

*/

@Component({
  selector: 'app-root', // 可以通过<app-root>来进行调用
  templateUrl: './app.component.html', // <app-root>这个标签缩展现的内容
  styleUrls: ['./app.component.css'] // 指向css文件，组件的样式
})
export class AppComponent {
  // title = '我的angular demo';

}
