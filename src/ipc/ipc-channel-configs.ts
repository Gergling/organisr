import { IPCCHannelConfigFactory } from "./types/ipc-channel-config-props";
import {
  FinancialTransactionModelValueProps,
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
import {
  deleteFinancialAccount,
  FinancialAccountsModelProps,
  insertFinancialAccounts,
  selectFinancialAccounts,
  updateFinancialAccount
} from "../database/financial";

export const ipcChannelConfigs: IPCCHannelConfigFactory = {
  ipcTest: () => (_, arg) => new Promise<string>((resolve) => {
    console.log('handling ipc test')
    resolve('main ipc test handled: ' + arg)
  }),

  // TODO: Seems dangerous.
  dangerouslyExposedSQLInjector: ({ database }) => (_, sql: string) => new Promise((resolve, reject) => {
    database.all<{ [key: string]: string; }>(sql, (error, rows) => {
      if (error) {
        reject(error);
      }
      resolve(rows);
    });
  }),

  createFinancialAccounts:
    ({ database }) =>
      (_, accounts: FinancialAccountsModelProps[]) => insertFinancialAccounts(database, accounts),
  deleteFinancialAccounts:
    ({ database }) =>
      (_, id: number) => deleteFinancialAccount(database, id),
  listFinancialAccounts:
    ({ database }) =>
      () => selectFinancialAccounts(database),
  updateFinancialAccounts:
    ({ database }) =>
      (_, { id, name }: FinancialAccountsModelProps) => {
        const setCriteria: Pick<FinancialAccountsModelProps, 'name'> = {
          name,
        };
        const whereCriteria: Pick<FinancialAccountsModelProps, 'id'> = { id };
        return updateFinancialAccount(database, setCriteria, whereCriteria);
      },


  addFinancialTransactions:
    ({ database }) =>
      (_, transactions: FinancialTransactionsModelProps[]) =>
        insertFinancialTransactions(database, transactions),
  fetchFinancialTransaction:
    ({ database }) =>
      (_, id: number) => selectFinancialTransactions(database, { id }),
  fetchFinancialTransactions:
    ({ database }) =>
      () => selectFinancialTransactions(database),
  updateFinancialTransaction:
    ({ database }) =>
      (_, id: number, data: Partial<FinancialTransactionModelValueProps>) => 
        updateFinancialTransaction(database, data, { id }),

  addFinancialTransactionCategories:
    ({ database }) =>
      (_, categories: FinancialTransactionCategoriesModelProps[]) =>
        insertFinancialTransactionCategories(database, categories),
  deleteFinancialTransactionCategory:
    ({ database }) =>
      // TODO: Naming convention plurality could be improved.
      (_, transactionCategoryId: number) => deleteFinancialTransactionCategories(database, transactionCategoryId),
  fetchFinancialTransactionCategories:
    ({ database }) =>
      () => selectFinancialTransactionCategories(database),
  updateFinancialTransactionCategory:
    ({ database }) =>
      (_, { id, name, parent_id }: FinancialTransactionCategoriesModelProps) => {
        const setCriteria: Pick<FinancialTransactionCategoriesModelProps, 'name' | 'parent_id'> = {
          name,
          parent_id,
        };
        const whereCriteria: Pick<FinancialTransactionCategoriesModelProps, 'id'> = { id };
        return updateFinancialTransactionCategory(database, setCriteria, whereCriteria);
      },
};
