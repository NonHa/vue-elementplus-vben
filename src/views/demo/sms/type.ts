export type FlashListItem = {
  id: number,
  title: string,
  status: string,
  startDate: Date,
  endDate: Date,
}

export type FlashSessionListItem = {
  id: number,
  name: string,
  status?: string,
  startDate: Date,
  endDate: Date,
  productCount?: number
}
