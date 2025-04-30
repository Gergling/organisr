import { useState } from "react";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";
import { FinancialTransactionCategory, TransactionCategoriesSearchOptions } from "../../transaction-categories";
import { TransactionListTableRowProps } from "../types";
import { useTransactionListTableRow } from "../hooks";

type CategoryId = FinancialTransactionModelFetchMappingProps['category_id'];

type ControlProps = {
  categoryId: CategoryId;
  onCancel: () => void;
  onDone: (categoryId: CategoryId) => void;
  transactionId: FinancialTransactionModelFetchMappingProps['id'];
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
        selectedCategoryId={selectedCategoryId}
      />
      <Button onClick={handleDone}>Done</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </>
  );
}

const Row = (props: TransactionListTableRowProps) => {
  const {
    description,
    edit,
    id,
    net,
  } = props;
  const {
    buttonText,
    dayOfMonth,
    handleClose,
    handleOpenCategorisationControl,
    handleUpdateCategory,
    updatedCategoryId,
  } = useTransactionListTableRow(props);

  return (
    <TableRow>
      <TableCell>{dayOfMonth}</TableCell>
      <TableCell>{net}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        {(
          edit
          ? <Control
              categoryId={updatedCategoryId}
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
