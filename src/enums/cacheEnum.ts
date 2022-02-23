/*
 * @Author: your name
 * @Date: 2022-01-22 16:31:09
 * @LastEditTime: 2022-01-22 16:31:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\enums\cacheEnum.ts
 */
// token key
export const TOKEN_KEY = 'TOKEN__';

export const LOCALE_KEY = 'LOCALE__';

// user info key
export const USER_INFO_KEY = 'USER__INFO__';

// role info key
export const ROLES_KEY = 'ROLES__KEY__';

// project config key
export const PROJ_CFG_KEY = 'PROJ__CFG__KEY__';

// lock info
export const LOCK_INFO_KEY = 'LOCK__INFO__KEY__';

export const MULTIPLE_TABS_KEY = 'MULTIPLE_TABS__KEY__';

export const APP_DARK_MODE_KEY_ = '__APP__DARK__MODE__';

// base global local key
export const APP_LOCAL_CACHE_KEY = 'COMMON__LOCAL__KEY__';

// base global session key
export const APP_SESSION_CACHE_KEY = 'COMMON__SESSION__KEY__';

export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}
