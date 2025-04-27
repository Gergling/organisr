import { Category } from "../types";

export const getCategoryDescendants = (
  { data: { id } }: Category,
  categories: Category[],
): Category[] => categories.reduce((descendants, category) => {
  const { data: { parent_id } } = category;
  if (parent_id === id) {
    descendants.push(category);
    return [
      ...descendants,
      ...getCategoryDescendants(category, categories),
    ];
  }
  return descendants;
}, [] as Category[]);
