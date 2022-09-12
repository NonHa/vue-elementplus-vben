/*
 * @Author: your name
 * @Date: 2022-01-07 09:35:25
 * @LastEditTime: 2022-02-28 16:52:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Application\index.ts
 */
import { withInstall } from '/@/utils';

import appLogo from './src/AppLogo.vue';
import appProvider from './src/AppProvider.vue';
import appSearch from './src/search/AppSearch.vue';
import appLocalePicker from './src/AppLocalePicker.vue';
import appDarkModeToggle from './src/AppDarkModeToggle.vue';

export const AppLogo = withInstall(appLogo);
export const AppProvider = withInstall(appProvider);
export const AppSearch = withInstall(appSearch);
export const AppDarkModeToggle = withInstall(appDarkModeToggle);

export const AppLocalePicker = withInstall(appLocalePicker);
export { useAppProviderContext } from './src/useAppContext';
