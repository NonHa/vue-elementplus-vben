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
      name: 'RecommendBrand',
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
    },
    {
      path: 'hot',
      name: 'Tot',
      component: () => import('/@/views/demo/sms/hot.vue'),
      meta: {
        // affix: true,
        title: '人气推荐'
      }
    },
    {
      path: 'subject',
      name: 'Subject',
      component: () => import('/@/views/demo/sms/subject.vue'),
      meta: {
        // affix: true,
        title: '专题推荐'
      }
    },
    {
      path: 'advertise',
      name: 'Advertise',
      component: () => import('/@/views/demo/sms/advertise.vue'),
      meta: {
        // affix: true,
        title: '广告列表'
      }
    }
  ]
};

export default sms;
