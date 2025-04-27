import { useEffect, useState } from "react";
import { usePreloadIPC } from "../../../shared/preload-ipc-context";
import { FinancialTransactionCategory } from "../types";
import { getCategories } from "../utils";

export const useTransactionCategories = () => {
  const [categories, setCategories] = useState<FinancialTransactionCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    addFinancialTransactionCategories, // TODO: This is duplicated.
    fetchFinancialTransactionCategories,
    updateFinancialTransactionCategory,
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
    create: addFinancialTransactionCategories,
    update: updateFinancialTransactionCategory,
    categories,
    isLoading,
    refetch,
  };
};
