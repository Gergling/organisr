import { getInsertFactory } from "../../shared";
import { FinancialTransactionCategoriesModelProps } from "./types";
import { financialTransactionCategoriesDatabaseTableConfig } from "./config";

export const insertFinancialTransactionCategories = getInsertFactory<
  FinancialTransactionCategoriesModelProps,
  'id'
>(financialTransactionCategoriesDatabaseTableConfig);
