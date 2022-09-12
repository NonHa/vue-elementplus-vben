import path from 'path';
import type { Plugin, ResolvedConfig } from 'vite';
import sass from 'sass';
import fs from 'fs-extra';
import { normalizePath } from 'vite';
import { addCssTo2 } from '../../client/index';
export const VITE_PLUGIN_THEME_CLIENT_ENTRY = normalizePath(
  path.resolve(process.cwd(), 'build/client')
);
const cssLangs = `\\.(css|less|sass|scss|styl|stylus|postcss)($|\\?)`;
export const cssLangRE = new RegExp(cssLangs);

export const CLIENT_PUBLIC_ABSOLUTE_PATH = normalizePath(
  VITE_PLUGIN_THEME_CLIENT_ENTRY + '/client.js'
);

export const CLIENT_PUBLIC_PATH = `/${VITE_PLUGIN_THEME_CLIENT_ENTRY}/index.js`;
export function EleThemeDarkPlugin(): Plugin {
  let preloadFiles = [
    path.resolve(process.cwd(), 'node_modules/element-plus/theme-chalk/src/index.scss'),
    // path.resolve(process.cwd(), 'node_modules/element-plus/theme-chalk/src/dark/css-vars.scss'),
    // path.resolve(process.cwd(), 'node_modules/element-plus/theme-chalk/src/dark/var.scss'),
    //path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.dark.less'),
    // path.resolve(process.cwd(), 'src/design/index.less'),
  ];
  let darkModifyVars = {};
  function preloadSass() {
    if (!preloadFiles || !preloadFiles.length) {
      return;
    }

    let reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;

    for (const id of preloadFiles) {
      const code = fs.readFileSync(id, 'utf-8');
      // console.log('code', code);

      let sassCode = sass.compile(id, {
        functions: {
          'pow($base, $exponent)': function (args) {
            const base = args[0].assertNumber('base').assertNoUnits('base');
            const exponent = args[1].assertNumber('exponent').assertNoUnits('exponent');

            return new sass.SassNumber(Math.pow(base.value, exponent.value));
          },
          // bold: function () {
          //   return new sass.SassNumber(12);
          // },
        },
      });
      // console.log('sassCode', sassCode.css);
    }
  }
  let clientPath = '';
  let config: ResolvedConfig;
  return {
    name: 'ele-theme-dark',
    enforce: 'post',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
      clientPath = JSON.stringify(path.posix.join(config.base, CLIENT_PUBLIC_PATH));
      console.log('clientPath', clientPath);

      preloadSass();
    },
    async transform(code, id) {
      // console.log('id', id);
      // if (!id.endsWith('.sass') || !code.includes('@')) {
      //   return null;
      // }
      if (!cssLangRE.test(id)) {
        return null;
      }
      const getResult = (content: string) => {
        return {
          map: null,
          code: content,
        };
      };
      // console.log('clientPath----', clientPath);
      addCssTo2();
      const retCode = [];
      console.log(retCode.join('\n'));

      return null;
    },
  };
}
