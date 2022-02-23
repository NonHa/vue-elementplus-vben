/*
 * @Author: your name
 * @Date: 2022-01-24 17:08:02
 * @LastEditTime: 2022-01-28 17:15:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Container\index.ts
 */
import { withInstall } from '/@/utils';
import collapseContainer from './src/collapse/CollapseContainer.vue';
import scrollContainer from './src/ScrollContainer.vue';
import lazyContainer from './src/LazyContainer.vue';

export const CollapseContainer = withInstall(collapseContainer);
export const ScrollContainer = withInstall(scrollContainer);
export const LazyContainer = withInstall(lazyContainer);

export * from './src/typing';
