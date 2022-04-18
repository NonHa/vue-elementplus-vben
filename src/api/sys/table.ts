import { defHttp } from '/@/utils/http';
import { getMenuListResultModel } from './model/menuModel';
enum Api {
  menuList = '/table/getDemoList',
}
export function getMenuList(params) {
  return defHttp.get({ url: Api.menuList, params }, { errorMessageMode: 'none' });
}
