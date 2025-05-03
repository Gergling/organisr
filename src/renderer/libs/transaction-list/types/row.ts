import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";

export type TransactionListTableRowProps = FinancialTransactionModelFetchMappingProps & {
  isEditingAccount: boolean;
  isEditingCategory: boolean;
  handleEditAccountState: (state: boolean) => void;
  handleEditCategoryState: (state: boolean) => void;
};
