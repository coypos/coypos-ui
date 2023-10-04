export interface CategoryModel {
  ID: number | null;

  Name: string | null;

  parentCategory: CategoryModel | null;

  UpdateDate: Date | string | null;

  CreateDate: Date | string | null;
}
