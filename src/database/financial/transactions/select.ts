import { DataRecord, getSelectFactory } from "../../shared";
import { FINANCIAL_ACCOUNTS_DATABASE_TABLE_NAME } from "../accounts";
import { FINANCIAL_TRANSACTION_CATEGORIES_DATABASE_TABLE_NAME } from "../transaction-categories";
import { financialTransactionsDatabaseTableConfig } from "./config";
import {
  FinancialTransactionModelFetchMappingProps,
  FinancialTransactionModelForeignValueProps,
  FinancialTransactionsModelProps
} from "./types";

type ForeignValueProps = FinancialTransactionModelForeignValueProps;
type ForeignValueKeys = keyof ForeignValueProps;

const getJoinData = (
  joins: DataRecord<FinancialTransactionsModelProps>['joins']
): ForeignValueProps => {
  return joins.reduce<ForeignValueProps>((foreignValues, { fieldValues, table }) => {
    type Mapping = {
      [key in ForeignValueKeys]: string
    };
    const mapping: Mapping = {
      accountName: FINANCIAL_ACCOUNTS_DATABASE_TABLE_NAME,
      categoryName: FINANCIAL_TRANSACTION_CATEGORIES_DATABASE_TABLE_NAME,
    };

    Object.entries(mapping).forEach(([fieldName, tableName]) => {
      if (table === tableName) {
        foreignValues[fieldName as ForeignValueKeys] = fieldValues.name;
      }
    });

    return foreignValues;
  }, {
    accountName: null,
    categoryName: null,
  });
};

export const selectFinancialTransactions = getSelectFactory<
  FinancialTransactionsModelProps,
  FinancialTransactionModelFetchMappingProps
>(
  financialTransactionsDatabaseTableConfig,
  ({
    local,
    joins,
  }) => {
    const {
      accountName,
      categoryName,
    } = getJoinData(joins);
    return {
      ...local,
      accountName,
      categoryName,
    };
  }
);
