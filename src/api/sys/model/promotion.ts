import { Pagination, ReturnData } from './baseModel';
import type { FlashListItem,FlashSessionListItem} from '/@/views/demo/sms/type';


export type CoupType = NumberArrayPickOne<[0,1,2,3]>;

export interface FlashListParam extends Pagination {
  name: string,
  type: CoupType
}


export type FlashListModel = BaseReturnList<FlashListItem>
export type FlashSessionListModel = BaseReturnList<FlashSessionListItem>