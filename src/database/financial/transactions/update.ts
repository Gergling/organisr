import { getUpdateFactory } from "../../shared/get-update-factory";
import { financialTransactionsDatabaseTableConfig } from "./config";
import { FinancialTransactionsModelProps } from "./types";

export const updateFinancialTransaction = getUpdateFactory<
  FinancialTransactionsModelProps
>(financialTransactionsDatabaseTableConfig);
