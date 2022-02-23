/*
 * @Author: your name
 * @Date: 2022-01-06 09:33:51
 * @LastEditTime: 2022-02-23 09:31:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\build\vite\plugin\index.ts
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { configSvgIconsPlugin } from './svgSprite';
// https://icon-sets.iconify.design/
import purgeIcons from 'vite-plugin-purge-icons';
import { autoImportElementPlus } from './autoImportElementPlus';
import { configThemePlugin } from './theme';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

export function createVitePlugin(viteEnv: ViteEnv, isBuild: boolean) {
  const {} = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx(), vueSetupExtend()];
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  vitePlugins.push(purgeIcons());
  vitePlugins.push(autoImportElementPlus());
  vitePlugins.push(configThemePlugin(isBuild));

  return vitePlugins;
}
