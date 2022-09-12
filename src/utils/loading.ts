/*
 * @Author: your name
 * @Date: 2022-03-04 11:16:09
 * @LastEditTime: 2022-03-04 14:36:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\utils\loading.ts
 */

/**
 * 全局loading效果：合并多次loading请求，避免重复请求
 * 当调用一次showLoading，则次数+1；当次数为0时，则显示loading
 * 当调用一次hideLoading，则次数-1; 当次数为0时，则结束loading
 */
import { ElLoading } from 'element-plus';
import type { LoadingOptions } from 'element-plus';

// 定义一个请求次数的变量，用来记录当前页面总共请求的次数
let loadingRequestCount = 0;
// 初始化loading
let loadingInstance;

type Option = LoadingOptions & {
  hideTime?: number;
};
// 编写一个显示loading的函数 并且记录请求次数 ++
const showLoading = (target?: Option) => {
  // if (loadingRequestCount === 0) {
  // element的服务方式 target 我这边取的是表格class
  // 类似整个表格loading和在表格配置v-loading一样的效果，这么做是全局实现了，不用每个页面单独去v-loading
  loadingInstance = ElLoading.service(target);
  if (target?.hideTime) {
    let times = setTimeout(() => {
      hideLoading();
      clearTimeout(times);
    }, target.hideTime);
  }
  // }
  loadingRequestCount++;
};

// 编写一个隐藏loading的函数，并且记录请求次数 --
const hideLoading = () => {
  if (loadingRequestCount <= 0) return;
  loadingRequestCount--;
  if (loadingRequestCount === 0) {
    loadingInstance.close();
  }
};

export { showLoading, hideLoading };
