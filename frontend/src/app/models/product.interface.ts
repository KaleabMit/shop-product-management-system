export interface Product {
  id: number;
  productname: string;
  description?: string; 
  price: number;
  discount: number;
  image?: string;
}