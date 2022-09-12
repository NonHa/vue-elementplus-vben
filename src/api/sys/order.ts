import { defHttp } from '/@/utils/http';
enum Api {
  orderList = '/order/list',
  orderDelete = '/order/delete',
  orderSetting = '/order/setting/item',
  updateOrderSetting = '/order/setting/update',
  orderReturnAplyList = '/order/returnApply/list',
  updateOrderReturnApply = '/order/returnApply/update',
  orderReturnReasonList = '/order/returnReason/list',
  updateOrderReturnReason = '/order/returnReason/update',
  addOrderReturnReason = '/order/returnReason/add',
  deleteOrderReturnReason = '/order/returnReason/delete'
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

export function updateOrderReturnApply(params) {
  return defHttp.post({ url: Api.updateOrderReturnApply, params }, { errorMessageMode: 'none' });
}
export function orderReturnReasonList(params) {
  return defHttp.post({ url: Api.orderReturnReasonList, params }, { errorMessageMode: 'none' });
}

export function updateOrderReturnReason(params) {
  return defHttp.post({ url: Api.updateOrderReturnReason, params }, { errorMessageMode: 'none' });
}

export function addOrderReturnReason(params) {
  return defHttp.post({ url: Api.addOrderReturnReason, params }, { errorMessageMode: 'none' });
}
export function deleteOrderReturnReason(params) {
  return defHttp.post(
    { url: Api.deleteOrderReturnReason, params },
    { errorMessageMode: 'none', joinParamsToUrl: true }
  );
}