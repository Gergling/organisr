import { useMutation, useQuery } from "@tanstack/react-query";
import { FinancialTransactionModelValueProps, FinancialTransactionsModelProps } from "../../../../database/financial";
import { usePreloadIPC } from "../../../shared/preload-ipc-context";
import { useMemo, useState } from "react";
import { TransactionUploadModel } from "../../transaction-file-upload";

type UpdateProps = Pick<FinancialTransactionsModelProps, 'id'>
  & Partial<FinancialTransactionModelValueProps>;

const useTransactionsIPCUpdate = () => {
  const {
    fetchFinancialTransaction,
    updateFinancialTransaction,
  } = usePreloadIPC();
  const [updatedTransactionId, setUpdatedTransactionId] = useState<number | undefined>();
  const isUpdated = useMemo(
    () => updatedTransactionId !== undefined,
    [updatedTransactionId]
  );
  const fetch = () => updatedTransactionId !== undefined
    ? fetchFinancialTransaction(updatedTransactionId)
    : Promise.resolve([]);
  const { data: updatedTransactions, refetch } = useQuery({
    queryFn: fetch,
    queryKey: ['financial-transaction', updatedTransactionId],
    enabled: isUpdated,
  });
  const updatedTransaction = useMemo(
    () => updatedTransactions ? updatedTransactions[0] : undefined,
    [updatedTransactions]
  );

  const { mutate: update } = useMutation({
    mutationFn: ({ id, ...transaction }: UpdateProps) =>
      updateFinancialTransaction(id, transaction).then(() => {
        setUpdatedTransactionId(id);
        refetch();
      }).catch(console.error)
  });

  return {
    transaction: updatedTransaction,
    update,
  }
}

export const useTransactionsIPC = () => {
  const {
    // TODO: Figure out how this should integrate into the fetches and update.
    addFinancialTransactions,
    fetchFinancialTransactions,
  } = usePreloadIPC();
  const { transaction, update } = useTransactionsIPCUpdate();

  const { data: initialTransactions, refetch } = useQuery({
    queryFn: fetchFinancialTransactions,
    queryKey: ['list-financial-transactions'],
  });
  const { mutate: insert } = useMutation({
    mutationFn: (newTransactionData: TransactionUploadModel[]) =>
      addFinancialTransactions(newTransactionData).then(() => {
        refetch();
      }).catch(console.error)
  });

  const transactions = useMemo(
    () => initialTransactions?.map((originalTransaction) => {
      if (transaction && originalTransaction.id === transaction?.id) {
        return transaction;
      }

      return originalTransaction;
    }),
    [initialTransactions, transaction]
  );

  return {
    insert,
    transaction,
    transactions,
    update,
  }
};
