export interface Request {
  _id: string;
  order_requester: string;
  order_requester_phone: string;
  order_vendor: string;
  order_manager: string;
  order_manager_note: string;
  order_shipment_cost: number;
  order_total_cost: number;
  order_authorized: string;
  order_po: string;
  order_pay_terms: string;
  order_accounts: string;
  order_items: [
    {
      order_quantity: number;
      order_unit_price: number;
    }
  ];
  status: string;
  createdAt: any;
  updatedAt: any;
}
