import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";
import { TransactionCategoriesSearchOptions } from "../../transaction-categories/components/SearchOptions";
import { useMemo, useState } from "react";
import { useQueryTransaction } from "../../transaction-data";

type ControlProps = {
  categoryId: FinancialTransactionModelFetchMappingProps['category_id'];
  closeControl: () => void;
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
  closeControl,
}: ControlProps) => {
  // Clicking done should assign the category id to the transaction.
  // Both buttons should close the control.
  return (
    <>
      <TransactionCategoriesSearchOptions
        handleCategoryChange={console.log}
        selectedCategoryId={categoryId}
      />
      <Button onClick={closeControl}>Done</Button>
      <Button onClick={closeControl}>Cancel</Button>
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
  // TODO: It would be smart to update this individual transaction, and then only run a retrieval (select query) against this individual transaction.
  // We have the id, so...
  // const {
  //   refetch
  // } = useQueryTransaction(id);
  // console.log(  category_id,
  //   categoryName,
  //   date,
  //   description,
  //   edit,
  //   net,
  // );
  const dayOfMonth = date.split('-')[2];
  const buttonText = useMemo(() => category_id === null ? '(Uncategorised)' : categoryName, [category_id]);
  // category button should show the currently selected category (or lack thereof) and on clicking bring up a searchable dropdown of categories which aren't already assigned
  // list should include the option to create the category
  // editing the category itself might be out of scope, but if there's a neat place to put the button, decouple the existing category editing component accordingly
  // in fact, editing existing categories without the proper interface might be explicitly a bad idea.
  // Bringing up a modal for that wouldn't be too bad.
  return (
    <TableRow>
      <TableCell>{dayOfMonth}</TableCell>
      <TableCell>{net}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        {(
          edit
          ? <Control categoryId={category_id} closeControl={() => handleEditState(false)} transactionId={id} />
          : <Button onClick={() => handleEditState(true)}>{buttonText}</Button>
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
