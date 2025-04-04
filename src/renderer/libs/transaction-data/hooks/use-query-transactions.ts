import { useEffect, useState } from "react";
import { FinancialTransactionsModelProps } from "../../../../database/financial/transactions";
import { usePreloadIPC } from "../../../shared/preload-ipc-context/use-preload-ipc";

export const useQueryTransactions = () => {
  const [transactions, setTransactions] = useState<FinancialTransactionsModelProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    fetchFinancialTransactions,
  } = usePreloadIPC();
  useEffect(() => {
    setIsLoading(true);
    fetchFinancialTransactions()
      .then((transactions) => setTransactions(transactions))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    transactions,
  };
};
