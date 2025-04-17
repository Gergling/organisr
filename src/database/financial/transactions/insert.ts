import { getInsertFactory } from "../../shared";
import { FinancialTransactionModelInsertionProps } from "./types";
import { financialTransactionsDatabaseTableConfig } from "./config";

export const insertFinancialTransactions = getInsertFactory<
  FinancialTransactionModelInsertionProps
>(financialTransactionsDatabaseTableConfig);
