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
// import { autoImportElementPlus } from './autoImportElementPlus';
import { configThemePlugin } from './theme';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
// import ElementPlus from 'unplugin-element-plus/vite';

import styleImport from 'vite-plugin-style-import';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { configMockPlugin } from './mock';
export function createVitePlugin(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    PkgConfig(),
    OptimizationPersist(),
    // ElementPlus(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`;
          },
        },
      ],
    }),
  ];
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  vitePlugins.push(purgeIcons());
  // vitePlugins.push(autoImportElementPlus());
  vitePlugins.push(configThemePlugin(isBuild));
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  return vitePlugins;
}
