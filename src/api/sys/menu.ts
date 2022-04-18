import { defHttp } from '/@/utils/http';
import { getMenuListResultModel } from './model/menuModel';
enum Api {
  menuList = '/getMenuList',
}
export function getMenuList() {
  return defHttp.get<getMenuListResultModel>({ url: Api.menuList }, { errorMessageMode: 'none' });
}
