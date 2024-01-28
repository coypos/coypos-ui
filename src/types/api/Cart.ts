export interface CartModel {
  name: string;
  price: number;
  count: number;
  id: number;
  discountedPrice: number | null;
}
