import { getUpdateFactory } from "../../shared/sql-factory/get-update-factory";
import { financialTransactionsDatabaseTableConfig } from "./config";
import { FinancialTransactionsModelProps } from "./types";

export const updateFinancialTransaction = getUpdateFactory<
  FinancialTransactionsModelProps
>(financialTransactionsDatabaseTableConfig);
