/*
 * @Author: your name
 * @Date: 2022-01-26 11:56:42
 * @LastEditTime: 2022-02-11 16:20:13
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\logics\theme\updateBackground.ts
 */
import { colorIsDark, lighten, darken } from '/@/utils/color';
import { useAppStore } from '/@/store/modules/app';
import { ThemeEnum } from '/@/enums/appEnum';
import { setCssVar } from './util';

const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color';

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color';
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color';
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color';

/**
 * Change the background color of the top header
 * @param color
 */
export function updateHeaderBgColor(color?: string) {
  const appStore = useAppStore();
  const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
  if (!color) {
    if (darkMode) {
      color = '#151515';
    } else {
      color = appStore.getHeaderSetting.bgColor;
    }
  }
  // bg color
  setCssVar(HEADER_BG_COLOR_VAR, color);

  // hover color
  const hoverColor = lighten(color!, 6);
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor);

  // Determine the depth of the color value and automatically switch the theme
  // 类型检查器无法断定类型时，! 后缀断言运算符可以用于断言操作对象为
  // 非null和非undefined,即排除这两种类型的检查。代码编译转化后将去除该断言符。
  // 适用场景：当确定某操作对象一定为非null和非undefined时使用。否则，在编译运行代码是可能会
  // 出现不可预料的错误。! 运算符只是为了避开编写代码时 ts 类型检查器的检查警告。
  const isDark = colorIsDark(color!);

  appStore.setProjectConfig({
    headerSetting: {
      theme: isDark || darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    },
  });
}

/**
 * Change the background color of the left menu
 * @param color  bg color
 */
export function updateSidebarBgColor(color?: string) {
  const appStore = useAppStore();

  // if (!isHexColor(color)) return;
  const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
  if (!color) {
    if (darkMode) {
      color = '#212121';
    } else {
      color = appStore.getMenuSetting.bgColor;
    }
  }
  setCssVar(SIDER_DARK_BG_COLOR, color);
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6));
  setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5));

  // only #ffffff is light
  // Only when the background color is #fff, the theme of the menu will be changed to light
  const isLight = ['#fff', '#ffffff'].includes(color!.toLowerCase());

  appStore.setProjectConfig({
    menuSetting: {
      theme: isLight && !darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK,
    },
  });
}
