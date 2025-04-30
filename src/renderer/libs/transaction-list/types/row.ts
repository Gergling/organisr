import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";

export type TransactionListTableRowProps = FinancialTransactionModelFetchMappingProps & {
  edit: boolean;
  handleEditState: (state: boolean) => void;
};
