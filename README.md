# 梳理

基于 vue3 typescript element-plus vue-router pinia 实现后台管理系统

## layouts 基础架构

### 1.aside

## App

vue app 全局变量配置

### AppProvider

在 AppProvider 中监听窗口 size 变化 判断 isMobile 展示不同侧边栏样式 createAppProviderContext 设置 prefixCls 和 isMobile

## init

### initAppConfig

对项目的基础配置进行初始化： 缓存 project 变量 主题颜色

### icon

1. 使用 vite-plugin-svg-icons 自动引入 文件 src/assets/icons 中的 icon 将 icon 转为 SVG 插入到 body 中.

```ts
 // 使用虚拟 文件文件引入 main.ts中引入 import 'virtual:svg-icons-register';  会有一个 /@id/${SVG_ICONS_REGISTER_NAME} 的请求
//  vite 中 configureServer 的中间件拦截 上面的请求  并返回对应的 html字符串 改字符串 会执行 将对应目录下面的icon文件 转为svg并插入到body中 我们就可以直接使用
 <svg :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
 // .d.ts
 declare module 'virtual:*' {
  const result: any;
  export default result;
}
```

2. @element-plus/icons-vue 引入 element icon 组件.
3. @iconify/iconify 引入外部 url 组件

```ts
import Iconify from '@purge-icons/generated';
const svg = Iconify.renderSVG(icon, {});
if (svg) {
  el.textContent = '';
  el.appendChild(svg);
} else {
  const span = document.createElement('span');
  span.className = 'iconify';
  span.dataset.icon = icon;
  el.textContent = '';
  el.appendChild(span);
  console.log('span', span);
}
```

### store

使用 pinia [url](https://pinia.vuejs.org/)

### router

```ts
// 在。d.ts文件中对router的 RouteMeta类型进行拓展
export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number;
    // title
    title: string;
    // dynamic router level.
    dynamicLevel?: number;
    // dynamic router real route path (For performance).
    realPath?: string;
    // Whether to ignore permissions
    ignoreAuth?: boolean;
    // role info
    roles?: RoleEnum[];
    // Whether not to cache
    ignoreKeepAlive?: boolean;
    // Is it fixed on tab
    affix?: boolean;
    // icon on tab
    icon?: string;
    frameSrc?: string;
    // current page transition
    transitionName?: string;
    // Whether the route has been dynamically added
    hideBreadcrumb?: boolean;
    // Hide submenu
    hideChildrenInMenu?: boolean;
    // Carrying parameters
    carryParam?: boolean;
    // Used internally to mark single-level menus
    single?: boolean;
    // Currently active menu
    currentActiveMenu?: string;
    // Never show in tab
    hideTab?: boolean;
    // Never show in menu
    hideMenu?: boolean;
    isLink?: boolean;
    // only build for Menu
    ignoreRoute?: boolean;
    // Hide path for children
    hidePathForChildren?: boolean;
  }
}
```

### mock

vite-plugin-mock 插件 自动引入对应目录下的文件作为 mock 文件
