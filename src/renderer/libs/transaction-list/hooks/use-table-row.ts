import { useMemo, useState } from "react";
import { useTransactionsIPC } from "../../transaction-data";
import { TransactionListTableRowProps } from "../types";
import { FinancialAccountsFetchProps, FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";
import { FinancialTransactionCategory } from "../../transaction-categories";
import { useAccountsIPC } from "../../accounts";

type CategoryId = FinancialTransactionModelFetchMappingProps['category_id'];

const getAccountOptions = (
  accounts: FinancialAccountsFetchProps[],
  selectedAccountId: number | null
) => {
  if (selectedAccountId !== null) {
    const options: string[] = [];
    const selectedOptions: string[] = [];

    accounts.forEach(({ id, name }) => {
      if (id === selectedAccountId) {
        selectedOptions.push(name);
      } else {
        options.push(name);
      }
    });

    return [
      ...selectedOptions,
      '(Disassociate Account)',
      ...options,
    ];
  }
  
  return ['(Unaccounted)', ...accounts.map(({ name }) => name)];
};

export const useTransactionListTableRow = (props: TransactionListTableRowProps) => {
  const {
    account_id,
    category_id,
    id,
  } = props;

  const { allAccounts } = useAccountsIPC();

  const {
    transaction,
    update,
  } = useTransactionsIPC();

  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(account_id);
  const accountOptions = useMemo(
    () => getAccountOptions(allAccounts || [], selectedAccountId),
    [allAccounts, selectedAccountId]
  );
  const handleAccountChange = (_: React.SyntheticEvent, selectedAccountName: string | undefined) => {
    const selectedAccount = allAccounts?.find(({ name }) => name === selectedAccountName);
    const updatedAccountId = selectedAccount ? selectedAccount.id : null;
    setSelectedAccountId(updatedAccountId);
  };
  const handleUpdateAccount = () => update({ id, account_id: selectedAccountId });

  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>(category_id);
  const handleChangeCategory = (category: FinancialTransactionCategory | undefined) => {
    const category_id = category ? category.data.id : null;
    setSelectedCategoryId(category_id);
  };
  const handleUpdateCategory = () => update({ id, category_id: selectedCategoryId });

  return {
    accountOptions,
    handleAccountChange,
    handleChangeCategory,
    handleUpdateAccount,
    handleUpdateCategory,
    selectedAccountId,
    selectedCategoryId,
    transaction: transaction || props,
  };
}