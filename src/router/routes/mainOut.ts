/*
 * @Author: your name
 * @Date: 2022-01-05 15:20:34
 * @LastEditTime: 2022-02-09 16:14:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\router\routes\mainOut.ts
 */
/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut1',
    component: LAYOUT,
    redirect: '/main-out/mainOut2',

    meta: {
      title: 'MainOut1',
      // ignoreAuth: true,
      icon: 'mdi:abjad-hebrew',

      hideChildrenInMenu: true,
    },
    children: [
      {
        path: 'mainOut2',
        name: 'MainOut2',
        component: () => import('/@/views/dashboard/index.vue'),
        meta: {
          // affix: true,
          title: 'MainOut2',

          hideMenu: true,
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
  },
  // {
  //   path: '/main-out22',
  //   name: 'MainOut2',
  //   component: () => import('/@/layouts/default/index.vue'),
  //   meta: {
  //     title: 'MainOut3',
  //     ignoreAuth: true,
  //     icon: 'mdi:abjad-hebrew',
  //
  //   },
  //   children: [
  //     {
  //       path: 'index1',
  //       name: 'AboutPage1',
  //       component: () => import('/@/layouts/default/index.vue'),
  //       meta: {
  //         title: '111',
  //         icon: 'simple-icons:about-dot-me',
  //
  //       },
  //     },
  //     {
  //       path: 'index2',
  //       name: 'AboutPage2',
  //       component: () => import('/@/layouts/default/index.vue'),
  //       meta: {
  //         title: '111',
  //         icon: 'simple-icons:about-dot-me',
  //
  //       },
  //     },
  //     {
  //       path: 'index3',
  //       name: 'AboutPage3',
  //       component: () => import('/@/layouts/default/index.vue'),
  //       meta: {
  //         title: '111',
  //         icon: 'simple-icons:about-dot-me',
  //
  //       },
  //     },
  //     {
  //       path: 'index4',
  //       name: 'AboutPage4',
  //       component: () => import('/@/layouts/default/index.vue'),
  //       meta: {
  //         title: '111',
  //         icon: 'simple-icons:about-dot-me',
  //
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/main-out4',
  //   name: 'MainOut3',
  //   component: () => import('/@/layouts/default/index.vue'),
  //   meta: {
  //     title: 'MainOut',
  //     ignoreAuth: true,
  //     icon: 'mdi:abjad-hebrew',
  //
  //   },
  // },
  // {
  //   path: '/main-out5',
  //   name: 'MainOut4',
  //   component: () => import('/@/layouts/default/index.vue'),
  //   meta: {
  //     title: 'MainOut',
  //     ignoreAuth: true,
  //     icon: 'mdi:abjad-hebrew',
  //
  //   },
  // },
  // {
  //   path: '/main-out6',
  //   name: 'MainOut5',
  //   component: () => import('/@/layouts/default/index.vue'),
  //   meta: {
  //     title: 'MainOut',
  //     ignoreAuth: true,
  //     icon: 'mdi:abjad-hebrew',
  //
  //   },
  // },
  // {
  //   path: '/main-out7',
  //   name: 'MainOut6',
  //   component: () => import('/@/layouts/default/index.vue'),
  //   meta: {
  //     title: 'MainOut',
  //     ignoreAuth: true,
  //
  //   },
  // },
];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);
