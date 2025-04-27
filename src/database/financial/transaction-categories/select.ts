import { getSelectFactory } from "../../shared";
import { FinancialTransactionCategoriesModelProps } from "./types";
import { financialTransactionCategoriesDatabaseTableConfig } from "./config";

type Model = FinancialTransactionCategoriesModelProps;

export const selectFinancialTransactionCategories = getSelectFactory<
  Model,
  Model
>(
  financialTransactionCategoriesDatabaseTableConfig,
  ({ local }) => ({ ...local }),
);
