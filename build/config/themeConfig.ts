/*
 * @Author: your name
 * @Date: 2021-12-25 15:07:41
 * @LastEditTime: 2022-01-26 14:44:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-vben-admin\build\config\themeConfig.ts
 */
// import { generate } from '@ant-design/colors';

export const primaryColor = '#0960bd';

export const darkMode = 'light';

type Fn = (...arg: any) => any;

type GenerateTheme = 'default' | 'dark';

export interface GenerateColorsParams {
  mixLighten: Fn;
  mixDarken: Fn;
  tinycolor: any;
  color?: string;
}

export function generateAntColors(color, theme: GenerateTheme = 'default') {
  return [
    '#111d2c',
    '#112a45',
    '#15395b',
    '#164c7e',
    '#1765ad',
    '#177ddc',
    '#3993dc',
    '#65b7f3',
    '#8bcbf3',
    '#b2dcf3',
  ];
  // return generate(color, {
  //   theme,
  // });
}

export function getThemeColors(color?: string) {
  const tc = color || primaryColor;
  const lightColors = generateAntColors(tc);
  const primary = lightColors[5];
  const modeColors = generateAntColors(primary, 'dark');

  return [...lightColors, ...modeColors];
}

export function generateColors({
  color = primaryColor,
  mixLighten,
  mixDarken,
  tinycolor,
}: GenerateColorsParams) {
  const arr = new Array(19).fill(0);
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5);
  });

  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5);
  });

  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString();
  });

  const shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.'));

  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#ffffff');

  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#000000');
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes('-'));
}
