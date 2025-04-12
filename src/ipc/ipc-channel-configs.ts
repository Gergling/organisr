import { Database } from "sqlite3";
import { IPCChannelConfigProps } from "./types/ipc-channel-config-props";
import { FinancialTransactionsModelProps, insertFinancialTransactions } from "../database/financial/transactions";
import {
  FinancialTransactionCategoriesModelProps,
  insertFinancialTransactionCategories,
  selectFinancialTransactionCategories,
  updateFinancialTransactionCategory
} from "../database/financial/transaction-categories";

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
      (_, transactions: FinancialTransactionsModelProps[]) =>
        insertFinancialTransactions(database, transactions),
  },
  {
    channelName: 'financial-transactions-get',
    invocationName: 'fetchFinancialTransactions',
    setupMainHandler: (database: Database) =>
      () => selectFinancialTransactionCategories(database),
  },

  {
    channelName: 'financial-transaction-categories-add',
    invocationName: 'addFinancialTransactionCategories',
    setupMainHandler: (database: Database) =>
      (_, categories: FinancialTransactionCategoriesModelProps[]) =>{
        console.log(categories)
        return insertFinancialTransactionCategories(database, categories);
      },
  },
  {
    channelName: 'financial-transaction-categories-get',
    invocationName: 'fetchFinancialTransactionCategories',
    setupMainHandler: (database: Database) =>
      () => selectFinancialTransactionCategories(database),
  },
  {
    channelName: 'financial-transaction-categories-update',
    invocationName: 'updateFinancialTransactionCategory',
    setupMainHandler: (database: Database) =>
      (_, category: FinancialTransactionCategoriesModelProps) => {
        console.log(category)
        return updateFinancialTransactionCategory(database, category);
      },
  },
];
