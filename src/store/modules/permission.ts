/*
 * @Author: your name
 * @Date: 2022-01-21 17:15:56
 * @LastEditTime: 2022-01-28 11:16:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\store\modules\permission.ts
 */
import type { AppRouteRecordRaw, Menu } from '/@/router/types';

import { defineStore } from 'pinia';
import { store } from '/@/store/index';
import { asyncRoutes } from '/@/router/routes';
import { filter } from '/@/utils/helper/treeHelper';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

interface PermissionState {
  // Permission code list
  permCodeList: string[] | number[];
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  lastBuildMenuTime: number;
  // Backstage menu list
  backMenuList: Menu[];
  frontMenuList: Menu[];
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    backMenuList: [],
    // menu List
    frontMenuList: [],
  }),
  getters: {
    getBackMenuList(): Menu[] {
      return this.backMenuList;
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list;
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.permCodeList = [];
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      let routes: AppRouteRecordRaw[] = [];

      // const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
      //   const { meta } = route;
      //   const { ignoreRoute } = meta || {};
      //   return !ignoreRoute;
      // };
      const routeFilter = (route: AppRouteRecordRaw) => {
        return route !== null;
      };
      routes = filter(asyncRoutes, routeFilter);

      routes.push(ERROR_LOG_ROUTE);
      routes.push(PAGE_NOT_FOUND_ROUTE);
      this.setFrontMenuList(routes);

      return routes;
    },
  },
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
