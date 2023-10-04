import { CategoryModel } from "@/types/api/Category";

export interface ProductModel {
  ID: number | null;

  CreateDate: Date | string | null;

  UpdateDate: Date | string | null;

  Enabled: boolean | null;

  Name: string | null;

  Barcode: string | null;

  Price: number | null;

  IsLoose: boolean | null;

  Weight: number | null;

  Description: string | null;

  Category: CategoryModel | null;

  Image: string | null;
}
