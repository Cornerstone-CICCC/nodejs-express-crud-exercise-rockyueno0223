export interface Product{
  id: string;
  product_name: string;
  product_description: string;
  product_price: number;
}

export interface ProductRequestBody{
  product_name: string;
  product_description: string;
  product_price: number;
}
