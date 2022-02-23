/*
 * @Author: your name
 * @Date: 2022-01-05 15:35:57
 * @LastEditTime: 2022-01-05 15:36:20
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\router\routes\modules\dashboard.ts
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '主页',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/layouts/default/index.vue'),
      meta: {
        // affix: true,
        title: '主页',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/layouts/default/index.vue'),
      meta: {
        title: '主页',
      },
    },
  ],
};

export default dashboard;
