import { useState } from "react";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial/transactions";
import { usePreloadIPC } from "../../../shared/preload-ipc-context/use-preload-ipc";

export const useQueryTransaction = (transactionId: number | undefined) => {
  const [transaction, setTransaction] = useState<FinancialTransactionModelFetchMappingProps | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    fetchFinancialTransaction,
  } = usePreloadIPC();

  const refetch = () => {
    if (transactionId !== undefined) {
      setIsLoading(true);
      fetchFinancialTransaction(transactionId)
        .then((transaction) => {
          setTransaction(transaction);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  return {
    isLoading,
    refetch,
    transaction,
  };
};
