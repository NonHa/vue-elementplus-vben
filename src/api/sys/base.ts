import { defHttp } from '/@/utils/http';
enum Api {
  companyAddress = '/companyAddress/list'
}
export function companyAddress() {
  return defHttp.post({
    url: Api.companyAddress
  });
}
