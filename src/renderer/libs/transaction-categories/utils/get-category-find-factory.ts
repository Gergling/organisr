import { Category } from "../types";

export const getCategoryFindFactory = (
  categoryId: number
) => (
  { data: { id } }: Category
) => id === categoryId;
