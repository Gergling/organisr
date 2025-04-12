import { IPC_EXPOSURE_PROPERTY_NAME } from "../../../ipc/ipc-constants";
import {
  FinancialTransactionCategoriesModelInsertionProps,
  FinancialTransactionCategoriesModelProps,
  FinancialTransactionsModelProps
} from "../../../database/financial";
import { IPCMutationResponse } from "./";

export type IPCRendererExposedProps = {
  ipcTest: (message: string) => Promise<string>;

  addFinancialTransactions: (transactions: FinancialTransactionsModelProps[]) =>
    Promise<IPCMutationResponse>;
  fetchFinancialTransactions: () => Promise<FinancialTransactionsModelProps[]>;

  addFinancialTransactionCategories: (categories: FinancialTransactionCategoriesModelInsertionProps[]) =>
    Promise<IPCMutationResponse>;
  deleteFinancialTransactionCategory: (id: number) => Promise<IPCMutationResponse>;
  fetchFinancialTransactionCategories: () => Promise<FinancialTransactionCategoriesModelProps[]>;
  updateFinancialTransactionCategory: (category: FinancialTransactionCategoriesModelProps) =>
    Promise<IPCMutationResponse>;
};

export type PreloadIPC = {
  [IPC_EXPOSURE_PROPERTY_NAME]: IPCRendererExposedProps;
};
