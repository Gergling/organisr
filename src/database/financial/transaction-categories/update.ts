import { getUpdateFactory } from "../../shared/sql-factory/get-update-factory";
import { financialTransactionCategoriesDatabaseTableConfig } from "./config";
import { FinancialTransactionCategoriesModelProps } from "./types";

export const updateFinancialTransactionCategory = getUpdateFactory<
  FinancialTransactionCategoriesModelProps
>(financialTransactionCategoriesDatabaseTableConfig);
