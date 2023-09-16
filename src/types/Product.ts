export interface ProductModel {
  ID: number | null;

  CreateDate: Date | string | null;

  UpdatedDate: Date | string | null;

  Status: boolean | null;

  Name: string | null;

  Barcode: string | null;

  Price: number | null;

  Quantity: number | null;

  IsWeight: boolean | null;

  IsLoose: boolean | null;

  Description: string | null;

  Category: string | null;

  Image: string | null;
}
