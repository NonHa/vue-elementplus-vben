import { defHttp } from '/@/utils/http';
import type {OrderListParam,OrderListModel,OrderSettingModel,
  ReturnApplyParam,ReturnApplyModel,ReturnReasonParam,ReturnReasonModel} from '/@/api/sys/model/orderModel';
import type { ReturnApplyItem } from '/@/views/demo/order/type'; 
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

export function getOrderList(params:OrderListParam) {
  return defHttp.post<OrderListModel>({ url: Api.orderList, params }, { errorMessageMode: 'none' });
}

export function deleteOrderById(params: {id: number}) {
  return defHttp.get(
    { url: Api.orderDelete, params },
    { errorMessageMode: 'none', joinParamsToUrl: true }
  );
}

export function getOrderSetting() {
  return defHttp.get<OrderSettingModel>({ url: Api.orderSetting }, { errorMessageMode: 'none' });
}

export function updateOrderSetting(params:OrderSettingModel['data'] & {id: number}) {
  return defHttp.post({ url: Api.updateOrderSetting, params }, { errorMessageMode: 'none' });
}

export function orderReturnAplyList(params:ReturnApplyParam) {
  return defHttp.post<ReturnApplyModel>({ url: Api.orderReturnAplyList, params }, { errorMessageMode: 'none' });
}

export function updateOrderReturnApply(params:ReturnApplyItem) {
  return defHttp.post({ url: Api.updateOrderReturnApply, params }, { errorMessageMode: 'none' });
}
export function orderReturnReasonList(params:ReturnReasonParam) {
  return defHttp.post<ReturnReasonModel>({ url: Api.orderReturnReasonList, params }, { errorMessageMode: 'none' });
}

export function updateOrderReturnReason(params:ReturnReasonParam) {
  return defHttp.post({ url: Api.updateOrderReturnReason, params }, { errorMessageMode: 'none' });
}

export function addOrderReturnReason(params: Omit<ReturnReasonParam, 'id'|'createTime'>) {
  return defHttp.post({ url: Api.addOrderReturnReason, params }, { errorMessageMode: 'none' });
}
export function deleteOrderReturnReason(params: {id: number}) {
  return defHttp.post(
    { url: Api.deleteOrderReturnReason, params },
    { errorMessageMode: 'none', joinParamsToUrl: true }
  );
}
