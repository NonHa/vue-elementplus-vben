/*
 * @Author: your name
 * @Date: 2021-12-30 15:46:56
 * @LastEditTime: 2022-01-26 15:32:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \pro-github\ym-Vue3\vite.config.ts
 */
import type { UserConfig, ConfigEnv } from 'vite';
import pkg from './package.json';

import { resolve } from 'path';
import { loadEnv } from 'vite';
import { createVitePlugin } from './build/vite/plugin';
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant';
import { generateModifyVars } from './build/generate/generateModifyVars';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
console.log(pathResolve('src') + '/');
const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: '2022/01/26',
};
// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfig => {
  // loadEnv(mode, root);
  // 检查process.cwd()路径下.env.development.local、.env.development、.env.local、.env这四个环境文件。
  // 输出NODE_ENV和VITE_开头的键值对。
  // VITE_开头的键值对后面的不会覆盖前面的。
  // NODE_ENV的值后面的会覆盖前面的。
  const root = process.cwd();
  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';
  return {
    base: '/',
    root,

    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome86',
      outDir: OUTPUT_DIR,
     
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     // Used to delete console in production environment
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    server: {
      https: true,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      // proxy: createProxy(VITE_PROXY),
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    plugins: createVitePlugin(viteEnv, isBuild),

    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: ['@vue/runtime-core', '@vue/shared', '@iconify/iconify'],
      // entries: ['crypto-js','vue.js','pinia.js','vue-router.js']
    },
  };
};
