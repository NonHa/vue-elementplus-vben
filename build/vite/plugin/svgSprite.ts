/*
 * @Author: your name
 * @Date: 2022-01-06 09:37:04
 * @LastEditTime: 2022-01-06 11:49:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\build\vite\plugin\svgSprite.ts
 */
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

import path from 'path';

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}
