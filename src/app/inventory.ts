export interface Inventory {
  _id: string,
  item_id: string,
  item_name: string,
  item_unit_price: Number,
  item_description: string,
  requester: string,
  manager: string,
  vendor: {
    vendor_name: string,
    vendor_address: string,
    vendor_phone: string,
    vendor_fax: string
  },
  order_id: string,
  createdAt: any,
  updatedAt: any,
}
