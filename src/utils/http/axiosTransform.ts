/*
 * @Author: your name
 * @Date: 2021-12-31 09:47:36
 * @LastEditTime: 2021-12-31 10:20:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\utils\http\axiosTransform.ts
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Result, RequestOptions } from '/#/axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;
  /**
   * @description: 请求失败处理
   *
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;
  /**
   * @description: 请求之前的拦截器
   *
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig;
  /**
   * @description: 请求之后的拦截器
   *
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;
  /**
   * @description: 请求之前的拦截器错误处理
   *
   */
  requestInterceptosCatch?: (error: Error) => void;
  /**
   * @description: 请求之后的拦截器错误处理
   *
   */
  responseInterceptosCatch?: (error: Error) => void;
}
