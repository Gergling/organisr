import { getSelectFactory } from "../../shared";
import { financialTransactionsDatabaseTableConfig } from "./config";
import { FinancialTransactionsModelProps } from "./types";

export const selectFinancialTransactionCategories = getSelectFactory<
  FinancialTransactionsModelProps
>(
  financialTransactionsDatabaseTableConfig
);
