import { useEffect, useMemo, useState } from "react";
import { useTransactionMutation, useTransactionQuery } from "../../transaction-data";
import { TransactionListTableRowProps } from "../types";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";

type CategoryId = FinancialTransactionModelFetchMappingProps['category_id'];

export const useTransactionListTableRow = ({
  category_id,
  categoryName,
  date,
  handleEditState,
  id,
}: TransactionListTableRowProps) => {
  const {
    isMutating,
    isSuccess,
    mutateTransaction,
  } = useTransactionMutation();
  const {
    transaction,
    fetchTransaction,
  } = useTransactionQuery();
  const dayOfMonth = useMemo(() => date.split('-')[2], [date]);
  const buttonText = useMemo(() => {
    const getCategoryName = (
      dataCategoryName: FinancialTransactionModelFetchMappingProps['categoryName']
    ) => dataCategoryName ? dataCategoryName : '(Uncategorised)';

    if (transaction) {
      return getCategoryName(transaction.categoryName);
    }

    return getCategoryName(categoryName);
  }, [categoryName, transaction?.categoryName]);
  const [updatedCategoryId, setUpdatedCategoryId] = useState<CategoryId>(category_id);
  const handleClose = () => handleEditState(false);
  const handleOpenCategorisationControl = () => handleEditState(true);
  const handleUpdateCategory = (categoryId: CategoryId) => {
    mutateTransaction(id, categoryId === null ? undefined : categoryId);
    handleClose();
    setUpdatedCategoryId(categoryId);
  };

  useEffect(() => {
    if(!isMutating && isSuccess) {
      fetchTransaction(id);
    }
  }, [id, isMutating, isSuccess]);

  return {
    buttonText,
    dayOfMonth,
    handleClose,
    handleOpenCategorisationControl,
    handleUpdateCategory,
    updatedCategoryId,
  };
}