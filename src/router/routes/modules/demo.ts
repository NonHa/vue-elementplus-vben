/*
 * @Author: your name
 * @Date: 2022-01-05 15:35:57
 * @LastEditTime: 2022-02-27 15:38:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\router\routes\modules\dashboard.ts
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const demo: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/demo/table',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: 'Demo',
  },
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('/@/views/demo/table/Basic.vue'),
      meta: {
        // affix: true,
        title: 'table',
      },
    },
    {
      path: 'print',
      name: 'Print',
      component: () => import('/@/views/demo/feat/print.vue'),
      meta: {
        // affix: true,
        title: 'print',
      },
    },
    {
      path: 'context-menu',
      name: 'ContextMenu',
      component: () => import('/@/views/demo/context-menu/index.vue'),
      meta: {
        // affix: true,
        title: 'ContextMenu',
      },
    },
    {
      path: 'watermark',
      name: 'Watermark',
      component: () => import('/@/views/demo/watermark/index.vue'),
      meta: {
        // affix: true,
        title: 'Watermark',
      },
    },
    {
      path: 'ripple',
      name: 'Ripple',
      component: () => import('/@/views/demo/ripple/index.vue'),
      meta: {
        // affix: true,
        title: 'Ripple',
      },
    },
    {
      path: 'cropper',
      name: 'Cropper',
      component: () => import('/@/views/demo/cropper/index.vue'),
      meta: {
        // affix: true,
        title: 'Cropper',
      },
    },
    // {
    //   path: 'workbench',
    //   name: 'Dashboard2',
    //   component: () => import('/@/views/login/index.vue'),
    //   meta: {
    //     title: 'Dashboard3',
    //   },
    // },
  ],
};

export default demo;
