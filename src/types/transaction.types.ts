type TransactionItems = {
  product_id: number;
  quantity: number;
  notes: string;
};

export type CreateTransaction = {
  name: string;
  email: string;
  phone: string;
  message: string;
  items: TransactionItems[];
};
