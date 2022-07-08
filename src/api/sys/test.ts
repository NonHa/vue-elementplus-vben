import { defHttp } from '/@/utils/http';

enum Api {
  brand = '/brand/create',
 
}
export function getBrand(params) {
  return defHttp.post({ url: Api.brand, params }, { errorMessageMode: 'none' });
}

