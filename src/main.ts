/*
 * @Author: your name
 * @Date: 2021-12-30 15:46:55
 * @LastEditTime: 2022-02-27 14:25:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\main.ts
 */
import 'virtual:svg-icons-register';

import '/@/design/index.less';
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
import { setupRouterGuard } from '/@/router/guard';

import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupRouter, router } from '/@/router';
import { setupStore } from '/@/store/index';

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  initAppConfigStore();
  setupRouterGuard(router);
  setupRouter(app);
  // app.use(ElementPlus)
  app.mount('#app');
}
bootstrap();
