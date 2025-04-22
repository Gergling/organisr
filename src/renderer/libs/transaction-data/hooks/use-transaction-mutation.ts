import { useState } from "react";
import { usePreloadIPC } from "../../../../renderer/shared/preload-ipc-context";

export const useTransactionMutation = () => {
  const [error, setError] = useState<Error | undefined>();
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {
    updateFinancialTransaction,
  } = usePreloadIPC();

  const mutateTransaction = (id: number, categoryId: number | undefined) => {
    setError(undefined);
    setIsMutating(true);
    setIsSuccess(false);
    updateFinancialTransaction(id, categoryId)
      .then(() => setIsSuccess(true))
      .catch((error) => setError(error))
      .finally(() => setIsMutating(false));
  };

  return {
    error,
    isMutating,
    isSuccess,
    mutateTransaction,
  }
};
