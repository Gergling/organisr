import { getSelectFactory } from "../../shared";
import { FinancialTransactionCategoriesModelProps } from "./types";
import { financialTransactionCategoriesDatabaseTableConfig } from "./config";

export const selectFinancialTransactionCategories = getSelectFactory<
  FinancialTransactionCategoriesModelProps
>(
  financialTransactionCategoriesDatabaseTableConfig
);
