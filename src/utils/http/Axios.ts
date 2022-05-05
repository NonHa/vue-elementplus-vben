/*
 * @Author: your name
 * @Date: 2021-12-30 16:56:56
 * @LastEditTime: 2021-12-31 15:20:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\utils\http\Axios.ts
 */
import axios from 'axios';
import type { Result, RequestOptions, UploadFileParams } from '/#/axios';
import type { CreateAxiosOptions } from './axiosTransform';
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { isFunction } from '/@/utils/is';
import { AxiosCanceler } from './axiosCancel';
import { cloneDeep } from 'lodash-es';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import qs from 'qs';
export * from './axiosTransform';
export class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;
  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }
  /**
   * @description: create axios instance
 
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }
  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }
  /**
   * @description: Reconfigure axios
 
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }
  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        // @ts-ignore
        ignoreCancelToken: true,
      },
    });
  }
  /**
   * @description: Set genetal header
 
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }
  /**
   * @description: Interceptor configuration
 
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptosCatch,
      responseInterceptors,
      responseInterceptosCatch,
    } = transform;
    const axiosCanceler = new AxiosCanceler();
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const {
        // @ts-ignore
        headers: { ignoreCancelToken },
      } = config;
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;

      !ignoreCancel && axiosCanceler.addpending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);
    requestInterceptosCatch &&
      isFunction(requestInterceptosCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptosCatch);

    this.axiosInstance.interceptors.response.use((res: AxiosResponse) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    responseInterceptosCatch &&
      isFunction(responseInterceptosCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptosCatch);
  }

  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];
    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }
    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }
  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    const transform = this.getTransform();
    const { requestOptions } = this.options;
    const opt: RequestOptions = Object.assign({}, requestOptions, options);
    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;
    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
          }
          reject(e);
        });
    });
  }
}
