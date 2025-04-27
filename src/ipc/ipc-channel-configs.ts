import { IPCChannelConfigProps } from "./types/ipc-channel-config-props";
import {
  FinancialTransactionsModelProps,
  insertFinancialTransactions,
  selectFinancialTransactions,
  updateFinancialTransaction
} from "../database/financial/transactions";
import {
  deleteFinancialTransactionCategories,
  FinancialTransactionCategoriesModelProps,
  insertFinancialTransactionCategories,
  selectFinancialTransactionCategories,
  updateFinancialTransactionCategory
} from "../database/financial/transaction-categories";

// TODO: Attempt to force configs to include all props.
// Perhaps this should be an object where we iterate the entries for the factory functions.
// That way any missing functions would be immediately obvious.

// Proposed type change:
// Control the type from IPCChannelConfigProps.
// Instead of an array, use a mapped object.
// channelName and invocationName can be the same mapped key.
// The setupMainHandler could be changed to handlerFactory, but otherwise it's the same.
// setupIPCMainHandlers can just use an Object.entries.
// Generate an overall IPC exposure type from the keys and the response functions, along with the mapped object.
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
  // TODO: Seems dangerous.
  {
    channelName: 'run-sql-insecurely',
    invocationName: 'dangerouslyExposedSQLInjector',
    setupMainHandler: ({ database }) => (_, sql: string) => new Promise((resolve, reject) => {
      database.all<{ [key: string]: string; }>(sql, (error, rows) => {
        if (error) {
          reject(error);
        }
        resolve(rows);
      });
    }),
  },

  {
    channelName: 'financial-transaction-get',
    invocationName: 'fetchFinancialTransaction',
    setupMainHandler: ({ database }) =>
      (_, id: number) => selectFinancialTransactions(database, { id }),
  },
  {
    channelName: 'financial-transactions-add',
    invocationName: 'addFinancialTransactions',
    setupMainHandler: ({ database }) =>
      (_, transactions: FinancialTransactionsModelProps[]) =>
        insertFinancialTransactions(database, transactions),
  },
  {
    channelName: 'financial-transactions-get',
    invocationName: 'fetchFinancialTransactions',
    setupMainHandler: ({ database }) =>
      () => selectFinancialTransactions(database),
  },
  {
    channelName: 'financial-transactions-update',
    invocationName: 'updateFinancialTransaction',
    setupMainHandler: ({ database }) =>
      (_, id: number, category_id: number | undefined) => {
        return updateFinancialTransaction(database, { category_id }, { id });
      },
  },

  {
    channelName: 'financial-transaction-categories-add',
    invocationName: 'addFinancialTransactionCategories',
    setupMainHandler: ({ database }) =>
      (_, categories: FinancialTransactionCategoriesModelProps[]) =>{
        console.log(categories)
        return insertFinancialTransactionCategories(database, categories);
      },
  },
  {
    channelName: 'financial-transaction-categories-delete',
    invocationName: 'deleteFinancialTransactionCategory',
    setupMainHandler: ({ database }) =>
      // TODO: Naming convention plurality could be improved.
      (_, transactionCategoryId: number) => deleteFinancialTransactionCategories(database, transactionCategoryId),
  },
  {
    channelName: 'financial-transaction-categories-get',
    invocationName: 'fetchFinancialTransactionCategories',
    setupMainHandler: ({ database }) =>
      () => selectFinancialTransactionCategories(database),
  },
  {
    channelName: 'financial-transaction-categories-update',
    invocationName: 'updateFinancialTransactionCategory',
    setupMainHandler: ({ database }) =>
      (_, { id, name, parent_id }: FinancialTransactionCategoriesModelProps) => {
        const setCriteria: Pick<FinancialTransactionCategoriesModelProps, 'name' | 'parent_id'> = {
          name,
          parent_id,
        };
        const whereCriteria: Pick<FinancialTransactionCategoriesModelProps, 'id'> = { id };
        return updateFinancialTransactionCategory(database, setCriteria, whereCriteria);
      },
  },
];
