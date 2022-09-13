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
  deletecCoupon = '/coupon/delete',

  getHomeBrandList = '/home/brand/list',
  deleteHomeBrand = '/home/brand/delete',
  updateHomeBrand = '/home/brand/update',
  addHomeBrand = '/home/brand/add',

  getNewproductList = '/home/newproduct/list',
  deleteNewproduct = '/home/newproduct/delete',
  updateNewproduct = '/home/newproduct/update',
  addNewproduct = '/home/newproduct/add',

  getRecommendProductList = '/home/recommendProduct/list',
  deleteRecommendProduct = '/home/recommendProduct/delete',
  updateRecommendProduct = '/home/recommendProduct/update',
  addRecommendProduct = '/home/recommendProduct/add',

  getRecommendSubjectList = '/home/recommendSubject/list',
  deleteRecommendSubject = '/home/recommendSubject/delete',
  updateRecommendSubject = '/home/recommendSubject/update',
  addRecommendSubject = '/home/recommendSubject/add',

  getAdvertiseList = '/home/advertise/list',
  deleteAdvertise = '/home/advertise/delete',
  updateAdvertise = '/home/advertise/update',
  addAdvertise = '/home/advertise/add',

  addSubjectCategory = '/home/subject/category/add'
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

export function getHomeBrandList(params) {
  return defHttp.post({ url: Api.getHomeBrandList, params }, { errorMessageMode: 'none' });
}
export function updateHomeBrand(params) {
  return defHttp.post({ url: Api.updateHomeBrand, params }, { errorMessageMode: 'none' });
}
export function addHomeBrand(params) {
  return defHttp.post({ url: Api.addHomeBrand, params }, { errorMessageMode: 'none' });
}
export function deleteHomeBrand(params) {
  return defHttp.get({ url: Api.deleteHomeBrand, params }, { errorMessageMode: 'none' });
}

// 推荐新品
export function getNewproductList(params) {
  return defHttp.post({ url: Api.getNewproductList, params }, { errorMessageMode: 'none' });
}
export function updateNewproduct(params) {
  return defHttp.post({ url: Api.updateNewproduct, params }, { errorMessageMode: 'none' });
}
export function addNewproduct(params) {
  return defHttp.post({ url: Api.addNewproduct, params }, { errorMessageMode: 'none' });
}
export function deleteNewproduct(params) {
  return defHttp.get({ url: Api.deleteNewproduct, params }, { errorMessageMode: 'none' });
}

// 人气推荐
export function getRecommendProductList(params) {
  return defHttp.post({ url: Api.getRecommendProductList, params }, { errorMessageMode: 'none' });
}
export function updateRecommendProduct(params) {
  return defHttp.post({ url: Api.updateRecommendProduct, params }, { errorMessageMode: 'none' });
}
export function addRecommendProduct(params) {
  return defHttp.post({ url: Api.addRecommendProduct, params }, { errorMessageMode: 'none' });
}
export function deleteRecommendProduct(params) {
  return defHttp.get({ url: Api.deleteRecommendProduct, params }, { errorMessageMode: 'none' });
}

// 专题推荐
export function getRecommendSubjectList(params) {
  return defHttp.post({ url: Api.getRecommendSubjectList, params }, { errorMessageMode: 'none' });
}
export function updateRecommendSubject(params) {
  return defHttp.post({ url: Api.updateRecommendSubject, params }, { errorMessageMode: 'none' });
}
export function addRecommendSubject(params) {
  return defHttp.post({ url: Api.addRecommendSubject, params }, { errorMessageMode: 'none' });
}
export function deleteRecommendSubject(params) {
  return defHttp.get({ url: Api.deleteRecommendSubject, params }, { errorMessageMode: 'none' });
}

// 广告列表
export function getAdvertiseList(params) {
  return defHttp.post({ url: Api.getAdvertiseList, params }, { errorMessageMode: 'none' });
}
export function updateAdvertise(params) {
  return defHttp.post({ url: Api.updateAdvertise, params }, { errorMessageMode: 'none' });
}
export function addAdvertise(params) {
  return defHttp.post({ url: Api.addAdvertise, params }, { errorMessageMode: 'none' });
}
export function deleteAdvertise(params) {
  return defHttp.get({ url: Api.deleteAdvertise, params }, { errorMessageMode: 'none' });
}

// 专题
export function addSubjectCategory(params) {
  return defHttp.post({ url: Api.addSubjectCategory, params }, { errorMessageMode: 'none' });
}
