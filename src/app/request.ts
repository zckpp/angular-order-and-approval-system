export interface Request {
  _id: string,
  requester: string,
  requester_phone: string,
  vendor: {
    vendor_name: string,
    vendor_address: string,
    vendor_phone: string,
    vendor_fax: string
  };
  manager: string,
  manager_email: string,
  manager_note: string,
  shipment_cost: number,
  total_cost: number,
  authorized: string,
  po: string,
  pay_terms: string,
  accounts: string,
  order_items: [
    {
      order_name: string,
      order_quantity: number,
      order_unit_price: number,
      order_description: string,
    }
  ];
  status: string,
  createdAt: any,
  updatedAt: any,
}
