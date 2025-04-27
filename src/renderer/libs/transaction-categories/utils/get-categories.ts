import { FinancialTransactionCategoriesModelProps } from "../../../../database/financial";
import { FinancialTransactionCategory } from "../types";

const getCategoryPath = (
  { parent_id, name }: FinancialTransactionCategoriesModelProps,
  categories: FinancialTransactionCategoriesModelProps[],
): string => {
  if (parent_id) {
    const parentCategory = categories.find(({ id }) => id === parent_id);
    if (parentCategory) {
      return [getCategoryPath(parentCategory, categories), name].join('/');
    } else {
      throw new Error('Somehow this category has a parent id for a category that does not exist. That should not be able to happen.');
    }
  }

  return name;
};

const compareCategories = (
  a: FinancialTransactionCategory,
  b: FinancialTransactionCategory
) => a.path.localeCompare(b.path);

export const getCategories = (
  categories: FinancialTransactionCategoriesModelProps[]
): FinancialTransactionCategory[] => categories.map((data) => ({
  data,
  path: getCategoryPath(data, categories)
})).sort(compareCategories);
