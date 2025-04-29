import { useMutation, useQuery } from "@tanstack/react-query";
import { FinancialAccountsModelProps } from "../../../../database/financial";
import { usePreloadIPC } from "../../../shared/preload-ipc-context";
import { FinancialAccountsModelValueProps } from "../types";

export const useAccountsIPC = () => {
  const {
    createFinancialAccounts,
    deleteFinancialAccounts,
    listFinancialAccounts,
    updateFinancialAccounts,
  } = usePreloadIPC();

  const { data: allAccounts, refetch: refetchAllAccounts, isFetching } = useQuery({
    queryKey: ['list-financial-accounts'],
    queryFn: listFinancialAccounts,
  })
  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: (account: FinancialAccountsModelValueProps) =>
      createFinancialAccounts([account]).then(() => refetchAllAccounts()),
  });
  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: (accountId: number) =>
      deleteFinancialAccounts(accountId).then(() => refetchAllAccounts()),
  });
  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: (account: FinancialAccountsModelProps) =>
      updateFinancialAccounts(account).then(() => refetchAllAccounts()),
  });

  const isPending = isFetching || isCreating || isDeleting || isUpdating;

  return {
    allAccounts,
    create,
    isPending,
    remove,
    update,
  };
};
