
import {Pagination,ReturnData} from  './baseModel'
import { col } from '/@/views/demo/order/orderData';
const statusType = [0,1,2,3,4,5] as const;
const sourceType = [0,1] as const;
type Col = {
  [P in keyof typeof col]: typeof col[number]['prop']
}[0]
export interface OrderListParam extends Pagination {
  receiverKeyWord?:string,
  status?:typeof statusType[number],
  orderType?:typeof sourceType[number],
  sourceType?:typeof sourceType[number],
  createTime?:Date,
}

export type OrderListModel ={
  data: {
    Col: number
  }[]
} & ReturnData

