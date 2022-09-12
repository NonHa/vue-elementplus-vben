/*
 * @Author: your name
 * @Date: 2022-01-21 17:15:56
 * @LastEditTime: 2022-02-27 15:35:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\store\modules\permission.ts
 */
import type { AppRouteRecordRaw, Menu } from '/@/router/types';
import { toRaw } from 'vue';
import { defineStore } from 'pinia';
import { store } from '/@/store/index';
import { asyncRoutes } from '/@/router/routes';
import { filter } from '/@/utils/helper/treeHelper';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { flatMultiLevelRoutes } from '/@/router/helper/routeHelper';
import { transformRouteToMenu } from '/@/router/helper/menuHelper';
import { getMenuListResultModel, RouteItem } from '/@/api/sys/model/menuModel';

import { useUserStore } from './user';
import { PageEnum } from '/@/enums/pageEnum';
import type { menuItem } from './user';

import { useAppStore } from '/@/store/modules/app';
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
    frontMenuList: []
  }),

  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList;
    },
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
    }
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },
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
      const userStore = useUserStore();

      // const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
      //   const { meta } = route;
      //   const { ignoreRoute } = meta || {};
      //   return !ignoreRoute;
      // };

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return;
        let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/';
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route;
            const currentPath = path.startsWith('/') ? path : parentPath + path;
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string;
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true });
                throw new Error('end');
              }
            }
            children && children.length > 0 && patcher(children, currentPath);
          });
        }
        try {
          patcher(routes);
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return;
      };

      routes = asyncRoutes;

      // Convert multi-level routing to level 2 routing

      const menu = toRaw(userStore.getMenu) || [];

      const menuNames: string[] = [];

      const getMenuNames = function (menuItem: menuItem[]) {
        menuItem.forEach((v) => {
          menuNames.push(v.title as string);
        });
      };
      getMenuNames(menu);

      const filterRouteBymenu = function (routes: AppRouteRecordRaw[]) {
        const routeItem: AppRouteRecordRaw[] = [];

        routes.forEach((v) => {
          if (v.children) {
            v.children = filterRouteBymenu(v.children);
          }
          const { title } = v.meta;
          if (menuNames.includes(title)) routeItem.push(v);
        });
        return routeItem;
      };

      routes = filterRouteBymenu(routes);
      // console.log('mapRoutes', routes);

      routes.push(ERROR_LOG_ROUTE);
      routes.push(PAGE_NOT_FOUND_ROUTE);
      const menuList = transformRouteToMenu(routes, true);
      // routes = flatMultiLevelRoutes(menuList);
      this.setFrontMenuList(menuList);
      patchHomeAffix(routes);
      // console.log('routes---', routes);
      // console.log('routes',routes);

      return routes;
    }
  }
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
