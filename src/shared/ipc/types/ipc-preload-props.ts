import { IPC_EXPOSURE_PROPERTY_NAME } from "../../../ipc/ipc-constants";
import {
  FinancialTransactionCategoriesModelInsertionProps,
  FinancialTransactionCategoriesModelProps,
  FinancialTransactionModelFetchMappingProps,
  FinancialTransactionsModelProps
} from "../../../database/financial";
import { IPCMutationResponse } from "./";

export type IPCRendererExposedProps = {
  ipcTest: (message: string) => Promise<string>;
  dangerouslyExposedSQLInjector: (sql: string) => Promise<{ [key: string]: string }[]>;

  addFinancialTransactions: (transactions: FinancialTransactionsModelProps[]) =>
    Promise<IPCMutationResponse>;
  fetchFinancialTransactions: () => Promise<FinancialTransactionModelFetchMappingProps[]>;
  fetchFinancialTransaction: (transactionId: number) => Promise<FinancialTransactionModelFetchMappingProps[]>;
  updateFinancialTransaction: (transactionId: number, categoryId: number | undefined) => Promise<void>;

  addFinancialTransactionCategories: (categories: FinancialTransactionCategoriesModelInsertionProps[]) =>
    Promise<FinancialTransactionCategoriesModelProps[]>;
  deleteFinancialTransactionCategory: (id: number) => Promise<IPCMutationResponse>;
  fetchFinancialTransactionCategories: () => Promise<FinancialTransactionCategoriesModelProps[]>;
  updateFinancialTransactionCategory: (category: FinancialTransactionCategoriesModelProps) =>
    Promise<IPCMutationResponse>;
};

export type PreloadIPC = {
  [IPC_EXPOSURE_PROPERTY_NAME]: IPCRendererExposedProps;
};
