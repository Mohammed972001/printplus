export interface Product {
  productImage: string;
  quantity: number;
  size: string;
  color: string;
  edges: string;
  status: string; 
  price: string;
}

export interface Order {
  id: string;
  status: string;
  products: Product[];
  totalPrice: number;
  deliveryDate: string;
}
