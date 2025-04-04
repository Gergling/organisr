import { IPC_EXPOSURE_PROPERTY_NAME } from "../../../ipc/ipc-constants";
import { FinancialTransactionCategoriesModelProps, FinancialTransactionsModelProps } from "../../../database/financial";
import { IPCMutationResponse } from "./";

export type IPCRendererExposedProps = {
  ipcTest: (message: string) => Promise<string>;

  addFinancialTransactions: (transactions: FinancialTransactionsModelProps[]) =>
    Promise<IPCMutationResponse>;
  fetchFinancialTransactions: () => Promise<FinancialTransactionsModelProps[]>;

  addFinancialTransactionCategories: (transactions: FinancialTransactionCategoriesModelProps[]) =>
    Promise<IPCMutationResponse>;
  fetchFinancialTransactionCategories: () => Promise<FinancialTransactionCategoriesModelProps[]>;
};

export type PreloadIPC = {
  [IPC_EXPOSURE_PROPERTY_NAME]: IPCRendererExposedProps;
};
