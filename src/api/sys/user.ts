/*
 * @Author: your name
 * @Date: 2022-01-24 10:42:24
 * @LastEditTime: 2022-01-24 10:46:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\api\sys\user.ts
 */
import { defHttp } from '/@/utils/http';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/admin/login',
  Logout = '/logout',
  GetUserInfo = '/admin/info',
  GetPermCode = '/getPermCode',
  getUserList = '/admin/list',
  updateUser = '/admin/update',
  register = '/admin/register',
  roleList = '/role/list',
  updateRoleById = '/role/update',
  addRole = '/role/add',
  menuList = '/menu/list',
  updateMenu = '/menu/update',
  addMenu = '/menu/add'
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params
    },
    {
      errorMessageMode: mode
    }
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
export function getUserList(params) {
  return defHttp.post({
    url: Api.getUserList,
    params
  });
}

export function updateUser(params) {
  return defHttp.post({
    url: Api.updateUser,
    params
  });
}
export function register(params) {
  return defHttp.post({
    url: Api.register,
    params
  });
}
export function roleList(params) {
  return defHttp.post({
    url: Api.roleList,
    params
  });
}
export function updateRoleById(params) {
  return defHttp.post({
    url: Api.updateRoleById,
    params
  });
}
export function addRole(params) {
  return defHttp.post({
    url: Api.addRole,
    params
  });
}
export function menuList(params) {
  return defHttp.post({
    url: Api.menuList,
    params
  });
}

export function updateMenu(params) {
  return defHttp.post({
    url: Api.updateMenu,
    params
  });
}

export function addMenu(params) {
  return defHttp.post({
    url: Api.addMenu,
    params
  });
}
