import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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

  const fetchAllQueryOptions = { queryKey: ['list-financial-accounts'] };

  const { data: allUnsortedAccounts, refetch: refetchAllAccounts, isFetching } = useQuery({
    queryFn: listFinancialAccounts,
    ...fetchAllQueryOptions,
  });
  const allAccounts = useMemo(
    () => allUnsortedAccounts?.sort((a, b) => a.name.localeCompare(b.name)),
    [allUnsortedAccounts]
  );

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

  const isPending = useMemo(
    () => isFetching || isCreating || isDeleting || isUpdating,
    [isFetching, isCreating, isDeleting, isUpdating]
  );

  return {
    allAccounts,
    create,
    isPending,
    remove,
    update,
  };
};
