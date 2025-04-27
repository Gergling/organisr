import { useState } from "react";
import { usePreloadIPC } from "../../../shared/preload-ipc-context";

export const useTransactionCategoryDelete = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const {
    deleteFinancialTransactionCategory,
  } = usePreloadIPC();
  const remove = (
    categoryId: number
  ) => new Promise<void>((resolve, reject) => {
    setIsDeleting(true);
    console.log('remove', categoryId)
    deleteFinancialTransactionCategory(categoryId)
      .then(() => resolve())
      .catch(reject)
      .finally(() => setIsDeleting(false));
  });

  return {
    isDeleting,
    remove,
  };
};
