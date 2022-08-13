import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const sms: AppRouteModule = {
  path: '/sms',
  name: 'Sms',
  component: LAYOUT,
  redirect: '/sms/list',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '营销'
  },
  children: [
    {
      path: 'list',
      name: 'Flash',
      component: () => import('/@/views/demo/sms/flash.vue'),
      meta: {
        // affix: true,
        title: '秒杀活动列表'
      }
    },
    {
      path: 'coup',
      name: 'Coup',
      component: () => import('/@/views/demo/sms/coup.vue'),
      meta: {
        // affix: true,
        title: '优惠券列表'
      }
    },
    {
      path: 'brand',
      name: 'Brand',
      component: () => import('/@/views/demo/sms/brand.vue'),
      meta: {
        // affix: true,
        title: '品牌推荐'
      }
    },
    {
      path: 'newProduct',
      name: 'NewProduct',
      component: () => import('/@/views/demo/sms/newProduct.vue'),
      meta: {
        // affix: true,
        title: '新品推荐'
      }
    }
  ]
};

export default sms;
