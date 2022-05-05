/*
 * @Author: your name
 * @Date: 2021-12-30 16:51:07
 * @LastEditTime: 2021-12-31 09:53:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\types\axios.d.ts
 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  joinParamsToUrl?: boolean;
  formatDate?: boolean;
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  joinPrefix?: boolean;
  apiUrl?: string;
  urlPrefix?: string;
  errorMessageMode?: ErrorMessageMode;
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  withToken?: boolean;
}
export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}
// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
