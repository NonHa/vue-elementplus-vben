import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const order: AppRouteModule = {
  path: '/order',
  name: 'Order',
  component: LAYOUT,
  redirect: '/order/list',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '订单'
  },
  children: [
    {
      path: 'list',
      name: 'OrderList',
      component: () => import('/@/views/demo/order/index.vue'),
      meta: {
        // affix: true,
        title: '订单列表'
      }
    },
    {
      path: 'setting',
      name: 'OrderSetting',
      component: () => import('/@/views/demo/order/setting.vue'),
      meta: {
        // affix: true,
        title: '订单设置'
      }
    },
    {
      path: 'returnApply',
      name: 'ReturnApply',
      component: () => import('/@/views/demo/order/returnApply.vue'),
      meta: {
        // affix: true,
        title: '退货申请处理'
      }
    },
    {
      path: 'returnReason',
      name: 'ReturnReason',
      component: () => import('/@/views/demo/order/returnReason.vue'),
      meta: {
        // affix: true,
        title: '退货原因处理'
      }
    }
  ]
};

export default order;
