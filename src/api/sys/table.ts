import { defHttp } from '/@/utils/http';
import { getMenuListResultModel } from './model/menuModel';
enum Api {
  menuList = '/table/getDemoList',
  treeList = '/tree/getDemoOptions',
}
export function getMenuList(params) {
  return defHttp.get({ url: Api.menuList, params }, { errorMessageMode: 'none' });
}
export function getTreeList(params) {
  return defHttp.get({ url: Api.treeList, params }, { errorMessageMode: 'none' });
}
