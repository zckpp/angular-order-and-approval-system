export interface Request {
  _id: string,
  order_requester: string,
  order_requester_phone: string,
  order_vendor: {
    order_vendor_name: string,
    order_vendor_address: string,
    order_vendor_phone: string,
    order_vendor_fax: string
  };
  order_manager: string,
  order_manager_note: string,
  order_shipment_cost: number,
  order_total_cost: number,
  order_authorized: string,
  order_po: string,
  order_pay_terms: string,
  order_accounts: string,
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
