/*
 * @Author: your name
 * @Date: 2022-01-08 17:14:50
 * @LastEditTime: 2022-01-08 17:20:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\build\vite\plugin\autoImportElementPlus.ts
 */
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export function autoImportElementPlus() {
  return (
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  );
}
