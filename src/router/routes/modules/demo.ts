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
