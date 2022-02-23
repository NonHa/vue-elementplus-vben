/*
 * @Author: your name
 * @Date: 2022-01-23 10:05:10
 * @LastEditTime: 2022-01-23 10:05:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\hooks\web\usePage.ts
 */
import type { RouteLocationRaw, Router } from 'vue-router';

import { PageEnum } from '/@/enums/pageEnum';
import { isString } from '/@/utils/is';
import { unref } from 'vue';

import { useRouter } from 'vue-router';
import { REDIRECT_NAME } from '/@/router/constant';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };

function handleError(e: Error) {
  console.error(e);
}

// page switch
export function useGo(_router?: Router) {
  let router;
  if (!_router) {
    router = useRouter();
  }
  const { push, replace } = _router || router;
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return;
    }
    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}

/**
 * @description: redo current page
 */
export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name';
        params['path'] = String(name);
      } else {
        params['_redirect_type'] = 'path';
        params['path'] = fullPath;
      }
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true));
    });
  }
  return redo;
};
