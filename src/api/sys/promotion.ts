import { defHttp } from '/@/utils/http';
enum Api {
  flashList = '/flash/list',
  updateFlash = '/flash/update',
  addFlash = '/flash/add',
  flashSessionList = '/flashSession/list',
  updateFlashSession = '/flashSession/update',
  addFlashSession = '/flashSession/add',
  flashSessionSelectList = '/flashSession/selectList',
  flashProductRelation = '/flashProductRelation/list',
  createFlashProductRelation = '/flashProductRelation/create',
  deleteFlashProductRelation = '/flashProductRelation/delete',
  updateFlashProductRelation = '/flashProductRelation/update',
  couponList = '/coupon/list',
  addCoupon = '/coupon/add',
  updateCoupon = '/coupon/update',
  deletecCoupon = '/coupon/delete'
}

export type FlashProductRelation = {
  flashPromotionId: Number | String;
  flashPromotionSessionId: Number | String;
  productId: Number | String;
}[];
export function getFlashList(params) {
  return defHttp.post({ url: Api.flashList, params }, { errorMessageMode: 'none' });
}
export function updateFlashById(params) {
  return defHttp.post({ url: Api.updateFlash, params }, { errorMessageMode: 'none' });
}

export function addFlash(params) {
  return defHttp.post({ url: Api.addFlash, params }, { errorMessageMode: 'none' });
}

export function flashSessionList() {
  return defHttp.post({ url: Api.flashSessionList }, { errorMessageMode: 'none' });
}
export function updateFlashSession(params) {
  return defHttp.post({ url: Api.updateFlashSession, params }, { errorMessageMode: 'none' });
}

export function addFlashSession(params) {
  return defHttp.post({ url: Api.addFlashSession, params }, { errorMessageMode: 'none' });
}
export function flashSessionSelectList(params) {
  return defHttp.get({ url: Api.flashSessionSelectList, params }, { errorMessageMode: 'none' });
}

export function flashProductRelationList(params) {
  return defHttp.get({ url: Api.flashProductRelation, params }, { errorMessageMode: 'none' });
}

export function createFlashProductRelation(params: FlashProductRelation) {
  return defHttp.post(
    { url: Api.createFlashProductRelation, params },
    { errorMessageMode: 'none' }
  );
}

export function deleteFlashProductRelation(params: { id: Number | String }) {
  return defHttp.get({ url: Api.deleteFlashProductRelation, params }, { errorMessageMode: 'none' });
}
export function updateFlashProductRelation(params) {
  return defHttp.post(
    { url: Api.updateFlashProductRelation, params },
    { errorMessageMode: 'none' }
  );
}
updateCoupon;
// 优惠券
export function couponList(params) {
  return defHttp.post({ url: Api.couponList, params }, { errorMessageMode: 'none' });
}
export function updateCoupon(params) {
  return defHttp.post({ url: Api.updateCoupon, params }, { errorMessageMode: 'none' });
}
export function addCoupon(params) {
  return defHttp.post({ url: Api.addCoupon, params }, { errorMessageMode: 'none' });
}
export function deletecCoupon(params) {
  return defHttp.get({ url: Api.deletecCoupon, params }, { errorMessageMode: 'none' });
}
