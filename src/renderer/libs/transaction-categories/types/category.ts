import { FinancialTransactionCategoriesModelProps } from "../../../../database/financial";

export type Category = {
  data: Omit<FinancialTransactionCategoriesModelProps, 'id'> & {
    id: number;
  };
  path: string;
}
