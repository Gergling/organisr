import { useState } from "react";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial/transactions";
import { usePreloadIPC } from "../../../shared/preload-ipc-context/use-preload-ipc";

export const useTransactionQuery = () => {
  const [data, setData] = useState<FinancialTransactionModelFetchMappingProps | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    fetchFinancialTransaction,
  } = usePreloadIPC();

  const fetchTransaction = (transactionId: number) => {
    setIsLoading(true);
    fetchFinancialTransaction(transactionId)
      .then(([response]) => setData(response))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    fetchTransaction,
    transaction: data,
  };
};
