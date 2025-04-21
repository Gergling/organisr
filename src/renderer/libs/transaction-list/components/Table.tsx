import { useEffect, useMemo, useState } from "react";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";
import { FinancialTransactionCategory, TransactionCategoriesSearchOptions } from "../../transaction-categories";
import { useTransactionMutation, useTransactionQuery } from "../../transaction-data";

type CategoryId = FinancialTransactionModelFetchMappingProps['category_id'];

type ControlProps = {
  categoryId: CategoryId;
  onCancel: () => void;
  onDone: (categoryId: CategoryId) => void;
  transactionId: FinancialTransactionModelFetchMappingProps['id'];
};

type RowProps = FinancialTransactionModelFetchMappingProps & {
  edit: boolean;
  handleEditState: (state: boolean) => void;
};

type TableProps = {
  transactions: FinancialTransactionModelFetchMappingProps[]
};

const Control = ({
  categoryId,
  onCancel,
  onDone,
}: ControlProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>(categoryId);
  const handleCategoryChange = (category: FinancialTransactionCategory | undefined) => {
    const updatedCategoryId = category ? category.data.id : null;
    setSelectedCategoryId(updatedCategoryId);
  };
  const handleDone = () => onDone(selectedCategoryId);
  return (
    <>
      <TransactionCategoriesSearchOptions
        handleCategoryChange={handleCategoryChange}
        selectedCategoryId={categoryId}
      />
      <Button onClick={handleDone}>Done</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </>
  );
}

const Row = ({
  category_id,
  categoryName,
  date,
  description,
  edit,
  handleEditState,
  id,
  net,
}: RowProps) => {
  const {
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
  const [updatedCategoryId, setUpdatedCategoryId] = useState<undefined | CategoryId>();
  const handleClose = () => handleEditState(false);
  const handleOpenCategorisationControl = () => handleEditState(true);
  const handleUpdateCategory = (categoryId: CategoryId) => {
    mutateTransaction(id, categoryId === null ? undefined : categoryId);
    handleClose();
    setUpdatedCategoryId(categoryId);
  };

  useEffect(() => {
    if(updatedCategoryId !== undefined) {
      fetchTransaction(id);
    }
  }, [id, updatedCategoryId]);

  return (
    <TableRow>
      <TableCell>{dayOfMonth}</TableCell>
      <TableCell>{net}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        {(
          edit
          ? <Control
              categoryId={category_id}
              onCancel={handleClose}
              onDone={handleUpdateCategory}
              transactionId={id}
            />
          : <Button onClick={handleOpenCategorisationControl}>{buttonText || '(blank)'}</Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export const TransactionListTable = ({
  transactions,
}: TableProps) => {
  const [editIDX, setEditIDX] = useState<number | null>(null);
  const handleEditStateFactory = (idx: number) => (state: boolean) => setEditIDX(state ? idx : null);
  return (
    <Table>
      <TableBody>
        {transactions.map((transaction, idx) => (
          <Row
            edit={idx === editIDX}
            handleEditState={handleEditStateFactory(idx)}
            key={idx}
            { ...transaction }
          />
        ))}
      </TableBody>
    </Table>
  );
};
