import { Autocomplete, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useMemo, useReducer } from "react";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";
import { TransactionCategoriesSearchOptions } from "../../transaction-categories";
import { TransactionListTableRowProps } from "../types";
import { useTransactionListTableRow } from "../hooks";
import { Control } from "./Control";

type TableProps = {
  transactions: FinancialTransactionModelFetchMappingProps[]
};

const Row = (props: TransactionListTableRowProps) => {
  const {
    date,
    description,
    handleEditAccountState,
    handleEditCategoryState,
    isEditingAccount,
    isEditingCategory,
    net,
  } = props;
  const dayOfMonth = useMemo(() => date.split('-')[2], [date]);
  const {
    accountOptions,
    handleAccountChange,
    handleChangeCategory,
    handleUpdateAccount,
    handleUpdateCategory,
    selectedCategoryId,
    transaction,
  } = useTransactionListTableRow(props);

  const getAccountButtonText = (
    { accountName }: FinancialTransactionModelFetchMappingProps
  ) => accountName ? accountName : '(Unaccounted)';
  const getCategoryButtonText = (
    { categoryName }: FinancialTransactionModelFetchMappingProps
  ) => categoryName ? categoryName : '(Uncategorised)';

  return (
    <TableRow>
      <TableCell>{dayOfMonth}</TableCell>
      <TableCell>{net}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        <Control
          getButtonText={getCategoryButtonText}
          handleEditState={handleEditCategoryState}
          isEditing={isEditingCategory}
          onDone={handleUpdateCategory}
          transaction={transaction}
        >
          <TransactionCategoriesSearchOptions
            handleCategoryChange={handleChangeCategory}
            selectedCategoryId={selectedCategoryId}
          />
        </Control>
      </TableCell>
      <TableCell>
        <Control
          getButtonText={getAccountButtonText}
          handleEditState={handleEditAccountState}
          isEditing={isEditingAccount}
          onDone={handleUpdateAccount}
          transaction={transaction}
        >
          <Autocomplete
            onChange={handleAccountChange}
            options={accountOptions}
            renderInput={(params) => <TextField {...params} />}
          />
        </Control>
      </TableCell>
    </TableRow>
  );
};

export const TransactionListTable = ({
  transactions,
}: TableProps) => {
  type EditingProps = {
    accountIDX?: number;
    categoryIDX?: number;
  }
  type EditingReducer = (
    state: EditingProps, value: Partial<EditingProps>
  ) => EditingProps;
  const [{
    accountIDX,
    categoryIDX,
  }, dispatch] = useReducer<EditingReducer>((state, value) => ({
    ...state,
    ...value,
  }), {});

  const getEditStateHandler = (idx: number, key: keyof EditingProps) =>
    (state: boolean) =>
      dispatch({ [key]: state ? idx : undefined });

  return (
    <Table>
      <TableBody>
        {transactions.map((transaction, idx) => (
          <Row
            handleEditAccountState={getEditStateHandler(idx, 'accountIDX')}
            handleEditCategoryState={getEditStateHandler(idx, 'categoryIDX')}
            isEditingAccount={accountIDX === idx}
            isEditingCategory={categoryIDX === idx}
            key={idx}
            { ...transaction }
          />
        ))}
      </TableBody>
    </Table>
  );
};
