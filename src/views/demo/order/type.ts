
import { SourceType } from "/@/api/sys/model/orderModel"
export type submitType = NumberArrayPickOne<[0,1,2,3]>
export type ReturnApplyItem = {
  id: number,
  createTime: Date,
  memberUsername: number,
  productRealPrice: number,
  status: submitType,
  handleTime?: Date,
  productPic: string,
  productName: string,
  productPrice: string,
  productAttr: string,
  productCount: string,
  orderSn: string,
  returnName: string,
  returnPhone: string,
  reason: string,
  description: string,
  proofPics: string,

  returnAmount: string,
  handleMan: string,
  handleNote: string,
  receiveNote: string,
  receiveMan: string,
  companyAddressId?: string
}

export type ReturnReasonItem = {
  id: number,
  name:string,
  sort:string,
  status:SourceType,
  createTime:Date,
}