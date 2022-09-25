import { Pagination, ReturnData } from './baseModel';

import type { ReturnApplyItem,submitType ,ReturnReasonItem} from '/@/views/demo/order/type';
type NumberArrayPickOne<T extends any[]> =  T[number];
type StatusType = NumberArrayPickOne<[0,1,2,3,4,5]>;
export type SourceType = NumberArrayPickOne<[0,1]>;
type PayType = NumberArrayPickOne<[0,1,2]>;

export interface OrderListParam extends Pagination {
  receiverKeyWord?: string;
  status?: StatusType;
  orderType?: SourceType;
  sourceType?: SourceType;
  createTime?: Date;
}

export type OrderListModel = {
  data: {
    id: number;
    orderSn: number;
    createTime: Date;
    memberUsername: string;
    totalAmount: number;
    payType: PayType;
    sourceType: SourceType;
    status: StatusType;
  }[];
} & ReturnData;

export type OrderSettingModel = {
  data: {
    flashOrderOvertime?: string | number;
    normalOrderOvertime?: string | number;
    confirmOvertime?: string | number;
    finishOvertime?: string | number;
    commentOvertime?: string | number;
  };
} & ReturnData;

export interface ReturnApplyParam {
  id: number,
  status?:submitType,
  createTime?: Date,
  handleMan?: string,
  handleTime?: Date,
}

export type ReturnApplyModel = BaseReturnList<ReturnApplyItem> 


export interface ReturnReasonParam {
  status?:SourceType,
}

export type ReturnReasonModel = BaseReturnList<ReturnReasonItem> 


