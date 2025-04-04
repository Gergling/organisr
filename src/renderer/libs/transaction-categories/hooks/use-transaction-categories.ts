import { useEffect, useState } from "react";
import { FinancialTransactionCategoriesModelProps } from "../../../../database/financial";
import { usePreloadIPC } from "../../../shared/preload-ipc-context";
import { Category } from "../types/category";

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

const compareCategories = (a: Category, b: Category) => a.path.localeCompare(b.path);

const getCategories = (
  categories: FinancialTransactionCategoriesModelProps[]
) => categories.map((data) => ({
  data,
  path: getCategoryPath(data, categories)
})).sort(compareCategories);

export const useTransactionCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    addFinancialTransactionCategories,
    fetchFinancialTransactionCategories,
  } = usePreloadIPC();
  const refetch = () => {
    setIsLoading(true);
    fetchFinancialTransactionCategories()
      .then((categories) => {
        setCategories(getCategories(categories));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    refetch();
  }, []);

  return {
    addFinancialTransactionCategories,
    categories,
    isLoading,
    refetch,
  };
};
