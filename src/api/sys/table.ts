import { defHttp } from '/@/utils/http';
import { getMenuListResultModel } from './model/menuModel';
enum Api {
  menuList = '/table/getDemoList',
  getAuthCode = '/sso/getAuthCode',
  verifyAuthCode = '/sso/verifyAuthCode',
  treeList = '/product/list',
  simpleList = '/product/simpleList',
  productCategoryList = '/productCategory/list/withChildren',
  getproductCategoryList = '/productCategory/list',
  deleteproductCategoryById = '/productCategory/delete',
  createproductCategory = '/productCategory/create',
  updateproductCategory = '/productCategory/update',

  deleteProduct = '/product/update/deleteStatus',
  brandList = '/brand/list',
  brandDelete = '/brand/delete',
  brandUpdate = '/brand/update',
  brandAdd = '/brand/create',
  getBrandById = '/brand',
  getBrandAll = '/brand/listAll',

  getProductAttCateList = '/productAttribute/category/list',
  createProductAttribute = '/productAttribute/category/create',
  deleteProductAttributeById = '/productAttribute/category/delete',
  getAttrList = '/productAttribute/category/getAttrList',

  getProductAttList = '/productAttribute/list',
  productAttributeDelete = '/productAttribute/delete',
  productAttributeAdd = '/productAttribute/create',

  subjectList = '/subject/list'
}

export function subjectList(params) {
  return defHttp.get({ url: Api.subjectList, params }, { errorMessageMode: 'none' });
}
export function getMenuList(params) {
  return defHttp.get({ url: Api.menuList, params }, { errorMessageMode: 'none' });
}
export function getTreeList(params) {
  return defHttp.post({ url: Api.treeList, params }, { errorMessageMode: 'none' });
}
export function simpleList(params) {
  return defHttp.get({ url: Api.simpleList, params }, { errorMessageMode: 'none' });
}
export function getAuthCode(params) {
  return defHttp.get({ url: Api.getAuthCode, params }, { errorMessageMode: 'none' });
}
export function verifyAuthCode(params) {
  return defHttp.get({ url: Api.verifyAuthCode, params }, { errorMessageMode: 'none' });
}
export function deleteProduct(params) {
  return defHttp.post(
    { url: Api.deleteProduct, params },
    { errorMessageMode: 'none', joinParamsToUrl: true }
  );
}

export function productCategoryList() {
  return defHttp.get({ url: Api.productCategoryList }, { errorMessageMode: 'none' });
}
export function getproductCategoryList(params) {
  return defHttp.post({ url: Api.getproductCategoryList, params }, { errorMessageMode: 'none' });
}
export function deleteproductCategoryById(id) {
  return defHttp.get(
    { url: Api.deleteproductCategoryById + '/' + id },
    { errorMessageMode: 'none' }
  );
}
export function createproductCategory(params) {
  return defHttp.post({ url: Api.createproductCategory, params }, { errorMessageMode: 'none' });
}
export function updateproductCategory(params) {
  return defHttp.post({ url: Api.updateproductCategory, params }, { errorMessageMode: 'none' });
}

export function brandList(params) {
  return defHttp.get({ url: Api.brandList, params }, { errorMessageMode: 'none' });
}
export function brandDelete(id) {
  return defHttp.get({ url: Api.brandDelete + `/${id}` }, { errorMessageMode: 'none' });
}

export function getBrandById(id) {
  return defHttp.get({ url: Api.getBrandById + `/${id}` }, { errorMessageMode: 'none' });
}
export function getBrandAll() {
  return defHttp.get({ url: Api.getBrandAll }, { errorMessageMode: 'none' });
}

export function brandUpdate(id, params) {
  return defHttp.post({ url: Api.brandUpdate + `/${id}`, params }, { errorMessageMode: 'none' });
}
export function brandAdd(params) {
  return defHttp.post({ url: Api.brandAdd, params }, { errorMessageMode: 'none' });
}

export function getProductAttCateList(params) {
  return defHttp.get({ url: Api.getProductAttCateList, params }, { errorMessageMode: 'none' });
}

export function createProductAttribute(params) {
  return defHttp.post({ url: Api.createProductAttribute, params }, { errorMessageMode: 'none' });
}

export function deleteProductAttributeById(id) {
  return defHttp.get(
    { url: Api.deleteProductAttributeById + `/${id}` },
    { errorMessageMode: 'none' }
  );
}

export function getProductAttList(cid, params) {
  return defHttp.get(
    { url: Api.getProductAttList + `/${cid}`, params },
    { errorMessageMode: 'none' }
  );
}
export function getAttrList() {
  return defHttp.post({ url: Api.getAttrList }, { errorMessageMode: 'none' });
}
export function productAttributeDelete(params) {
  return defHttp.get({ url: Api.productAttributeDelete, params }, { errorMessageMode: 'none' });
}

export function productAttributeAdd(params) {
  return defHttp.post({ url: Api.productAttributeAdd, params }, { errorMessageMode: 'none' });
}
