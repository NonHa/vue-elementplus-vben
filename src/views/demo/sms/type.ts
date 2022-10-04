import { CoupType } from "/@/api/sys/model/promotion"
export type FlashListItem = {
  id: number,
  title: string,
  status: number,
  startDate: Date,
  endDate: Date,
}

export type FlashSessionListItem = {
  id: number,
  name: string,
  status?: number,
  startDate: Date,
  endDate: Date,
  productCount?: number
}

export type FlashProductListItem = {
  id: number,
  name: string,
  productSn?: number
  price?: number
  stock?: number
  flashPromotionPrice?: number
  flashPromotionCount?: number
  flashPromotionLimit?: number
  sort?: number
}

export type CoupListItem = {
  id: number,
  name: string,
  type: CoupType
  useType?: NumberArrayPickOne<[0,1,2]>
  minPoint?: number
  amount?: number
  enableTime?: Date
  status?: number
  sort?: number
}

export type BrandListItem = {
  id?: number,
  brandName: string,
  brandId: number,
  recommendStatus: number,
  sort: number,
  status?: number
}


export type AdvertiseItem = {
  id?: number,
  name: string,
  type: number,
  pic?: string,
  startTime: Date,
  status?: number,
  clickCount?: number,
  orderCount?: number
}

