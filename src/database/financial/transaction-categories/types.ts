import { TableConfigProps } from "../../shared";

export type FinancialTransactionCategoriesModelProps = {
  id?: number;
  name: string;
  parent_id?: number;
}

export type FinancialTransactionCategoriesTableConfigProps = TableConfigProps<
  FinancialTransactionCategoriesModelProps
>;
