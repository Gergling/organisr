import { getSelectFactory } from "../../shared";
import { financialTransactionsDatabaseTableConfig } from "./config";
import {
  FinancialTransactionModelFetchMappingProps,
  FinancialTransactionsModelProps
} from "./types";

export const selectFinancialTransactions = getSelectFactory<
  FinancialTransactionsModelProps,
  FinancialTransactionModelFetchMappingProps
>(
  financialTransactionsDatabaseTableConfig,
  ({
    local,
    joins: [
      { fieldValues: { name } }
    ],
  }) => ({
    ...local,
    categoryName: name,
  })
);
