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

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: 'Dashboard',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/login/index.vue'),
      meta: {
        // affix: true,
        title: 'Dashboard1',
      },
    },
    {
      path: 'workbench',
      name: 'Dashboard2',
      component: () => import('/@/views/login/index.vue'),
      meta: {
        title: 'Dashboard3',
      },
    },
  ],
};

export default dashboard;
