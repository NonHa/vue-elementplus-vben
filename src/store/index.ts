/*
 * @Author: your name
 * @Date: 2022-01-21 16:36:46
 * @LastEditTime: 2022-01-21 16:52:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\store\index.ts
 */
import type { App } from 'vue';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persist';

const store = createPinia();
store.use(piniaPluginPersistedstate);
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
