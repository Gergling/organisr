import {
  FinancialTransactionCategoriesModelProps as Base,
  FinancialTransactionCategoriesModelInsertionProps as BaseInsertion
} from "../../../../database/financial";

export type FinancialTransactionCategoriesModelProps = Base
  & { forInsertion: false };

export type FinancialTransactionCategoriesModelInsertionProps = BaseInsertion
  & { forInsertion: true };
