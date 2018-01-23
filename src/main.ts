import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module'; //导入主模块
import { environment } from './environments/environment';  //导入环境配置

//如果是在开发者环境，则关闭开发者环境
if (environment.production) {
  enableProdMode(); 
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
