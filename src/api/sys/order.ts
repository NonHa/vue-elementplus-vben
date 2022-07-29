import { defHttp } from '/@/utils/http';
enum Api {
  orderList = '/order/list',
  orderDelete = '/order/delete',
  orderSetting = '/order/setting/item',
  updateOrderSetting = '/order/setting/update',
  orderReturnAplyList = '/order/returnApply/list'
}

export function getOrderList(params) {
  return defHttp.post({ url: Api.orderList, params }, { errorMessageMode: 'none' });
}

export function deleteOrderById(params) {
  return defHttp.get(
    { url: Api.orderDelete, params },
    { errorMessageMode: 'none', joinParamsToUrl: true }
  );
}

export function getOrderSetting() {
  return defHttp.get({ url: Api.orderSetting }, { errorMessageMode: 'none' });
}

export function updateOrderSetting(params) {
  return defHttp.post({ url: Api.updateOrderSetting, params }, { errorMessageMode: 'none' });
}

export function orderReturnAplyList(params) {
  return defHttp.post({ url: Api.orderReturnAplyList, params }, { errorMessageMode: 'none' });
}
