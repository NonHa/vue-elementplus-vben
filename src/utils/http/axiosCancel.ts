/*
 * @Author: your name
 * @Date: 2021-12-31 11:33:20
 * @LastEditTime: 2021-12-31 14:12:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\utils\http\axiosCancel.ts
 */

import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import { isFunction } from '/@/utils/is';

let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  addpending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
  }
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
