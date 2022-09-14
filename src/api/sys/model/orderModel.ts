import { Pagination, ReturnData } from './baseModel';

type NumberArrayPickOne<T extends any[]> = T[number];
type StatusType = NumberArrayPickOne<[0, 1, 2, 3, 4, 5]>;
type SourceType = NumberArrayPickOne<[0, 1]>;
type PayType = NumberArrayPickOne<[0, 1, 2]>;
type submitType = NumberArrayPickOne<[0, 1, 2, 3]>;

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
  id?: number;
  status?: submitType;
  createTime?: Date;
  handleMan?: string;
  handleTime?: Date;
}

export type ReturnApplyModel = {
  data: {
    id: number;
    createTime: Date;
    memberUsername: number;
    productRealPrice: number;
    status: submitType;
    handleTime?: Date;
  };
} & ReturnData;
