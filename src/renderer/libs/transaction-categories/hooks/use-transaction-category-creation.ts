import { useState } from "react";
import { FinancialTransactionCategoriesModelInsertionProps } from "../../../../database/financial";
import { usePreloadIPC } from "../../../shared/preload-ipc-context";
import { FinancialTransactionCategory } from "../types";
import { getCategories } from "../utils";

export const useTransactionCategoryCreation = () => {
  const [newCategories, setNewCategories] = useState<FinancialTransactionCategory[]>([]);
  const [error, setError] = useState<Error | undefined>();
  const [isInserting, setIsInserting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {
    addFinancialTransactionCategories,
  } = usePreloadIPC();

  const create = async (categoryData: FinancialTransactionCategoriesModelInsertionProps[]) => {
    setError(undefined);
    setIsInserting(true);
    setIsSuccess(false);
    addFinancialTransactionCategories(categoryData)
      .then((categories) => {
        setIsSuccess(true);
        // TODO: Sending the new categories through a sorting by path is probably overkill,
        // but that's ok for now because it's convenient.
        setNewCategories(getCategories(categories));
      })
      .catch((error) => setError(error))
      .finally(() => setIsInserting(false));
  };

  return {
    newCategories,
    create,
    error,
    isInserting,
    isSuccess,
  }
};
