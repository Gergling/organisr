import { getInsertFactory } from "../../shared";
import { FinancialTransactionsModelProps } from "./types";
import { financialTransactionsDatabaseTableConfig } from "./config";

export const insertFinancialTransactions = getInsertFactory<
  FinancialTransactionsModelProps,
  'id'
>(financialTransactionsDatabaseTableConfig);
