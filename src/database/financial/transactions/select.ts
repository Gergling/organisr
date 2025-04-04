import { getSelectFactory } from "../../shared";
import { financialTransactionsDatabaseTableConfig } from "./config";
import { FinancialTransactionsModelProps } from "./types";

export const selectFinancialTransactions = getSelectFactory<
  FinancialTransactionsModelProps
>(
  financialTransactionsDatabaseTableConfig
);
