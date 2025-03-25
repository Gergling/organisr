import { IPC_EXPOSURE_PROPERTY_NAME } from "../../../ipc/ipc-constants";
import { FinancialTransactionModelProps } from "../../../database/financial/transactions";
import { IPCMutationResponse } from "./";

export type IPCRendererExposedProps = {
  ipcTest: (message: string) => Promise<string>;

  addFinancialTransactions: (transactions: FinancialTransactionModelProps[]) =>
    Promise<IPCMutationResponse>;
  fetchFinancialTransactions: () => Promise<FinancialTransactionModelProps[]>;

};

export type PreloadIPC = {
  [IPC_EXPOSURE_PROPERTY_NAME]: IPCRendererExposedProps;
};
