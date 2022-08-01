import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/User/list',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '权限'
  },
  children: [
    {
      path: 'list',
      name: 'UserList',
      component: () => import('/@/views/demo/user/index.vue'),
      meta: {
        // affix: true,
        title: '用户列表'
      }
    },
    {
      path: 'role',
      name: 'RoleList',
      component: () => import('/@/views/demo/role/index.vue'),
      meta: {
        // affix: true,
        title: '角色列表'
      }
    },
    {
      path: 'menu',
      name: 'MenuList',
      component: () => import('/@/views/demo/user/menu.vue'),
      meta: {
        // affix: true,
        title: '菜单列表'
      }
    },
    {
      path: 'resource',
      name: 'Resource',
      component: () => import('/@/views/demo/user/resource.vue'),
      meta: {
        // affix: true,
        title: '资源列表'
      }
    }
  ]
};

export default user;
