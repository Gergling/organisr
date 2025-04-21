import { useState } from "react";
import { usePreloadIPC } from "../../../../renderer/shared/preload-ipc-context";

export const useTransactionMutation = () => {
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    updateFinancialTransaction,
  } = usePreloadIPC();

  const mutateTransaction = (id: number, categoryId: number | undefined) => {
    setError(undefined);
    setIsLoading(true);
    updateFinancialTransaction(id, categoryId)
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  return {
    error,
    isLoading,
    mutateTransaction,
  }
};
