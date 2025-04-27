import { FinancialTransactionCategoriesModelProps } from "../../../../database/financial";

export type FinancialTransactionCategory = {
  data: Omit<FinancialTransactionCategoriesModelProps, 'id'> & {
    id: number;
  };
  path: string;
}
