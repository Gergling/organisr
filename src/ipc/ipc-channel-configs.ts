import { Database } from "sqlite3";
import { IPCChannelConfigProps } from "./types/ipc-channel-config-props";
import {
  FinancialTransactionCollection,
  FinancialTransactionModel
} from "../database/financial/transactions";

export const ipcChannelConfigs: IPCChannelConfigProps[] = [
  {
    channelName: 'ipc-test',
    invocationName: 'ipcTest',
    setupMainHandler: () =>
      (_, arg) => new Promise<string>((resolve) => {
        console.log('handling ipc test')
        resolve('main ipc test handled: ' + arg)
      }),
  },

  {
    channelName: 'financial-transactions-add',
    invocationName: 'addFinancialTransactions',
    setupMainHandler: (database: Database) =>
      (_, transactions: FinancialTransactionModel[]) => FinancialTransactionCollection.insert(database, transactions),
  },
  {
    channelName: 'financial-transactions-get',
    invocationName: 'fetchFinancialTransactions',
    setupMainHandler: (database: Database) =>
      () => FinancialTransactionCollection.select(database),
  },
];
