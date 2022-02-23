/*
 * @Author: your name
 * @Date: 2022-01-07 09:35:25
 * @LastEditTime: 2022-02-10 16:33:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Application\index.ts
 */
import { withInstall } from '/@/utils';
import appLogo from './src/AppLogo.vue';
import appProvider from './src/AppProvider.vue';

export const AppLogo = withInstall(appLogo);
export const AppProvider = withInstall(appProvider);

export { useAppProviderContext } from './src/useAppContext';
