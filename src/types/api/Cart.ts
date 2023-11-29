export interface CartModel {
  name: string;
  price: number;
  count: number;
  discountedPrice: number | null;
}
