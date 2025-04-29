import { IPC_EXPOSURE_PROPERTY_NAME } from "../../../ipc/ipc-constants";
import {
  FinancialAccountsModelProps,
  FinancialTransactionCategoriesModelInsertionProps,
  FinancialTransactionCategoriesModelProps,
  FinancialTransactionModelFetchMappingProps,
  FinancialTransactionsModelProps
} from "../../../database/financial";

type CreateFunction<Model, PrimaryKeys extends keyof Model> = (
  models: Omit<Model, PrimaryKeys>[]
) => Promise<Model[]>;

type DeleteByPrimaryKeyFunction = (id: number) => Promise<void>;

type ListFunction<Model> = () => Promise<Model[]>;
// type FetchByPrimaryKeyFunction<
//   Model,
//   PrimaryKey extends keyof Model
// > = (id: PrimaryKey) => Promise<Model>;

type UpdateFunction<Model> = (
  model: Model
) => Promise<void>;

export type IPCRendererExposedProps = {
  ipcTest: (message: string) => Promise<string>;
  dangerouslyExposedSQLInjector: (sql: string) => Promise<{ [key: string]: string }[]>;

  createFinancialAccounts: CreateFunction<FinancialAccountsModelProps, 'id'>;
  deleteFinancialAccounts: DeleteByPrimaryKeyFunction;
  listFinancialAccounts: ListFunction<FinancialAccountsModelProps>;
  updateFinancialAccounts: UpdateFunction<FinancialAccountsModelProps>;

  addFinancialTransactions: CreateFunction<FinancialTransactionsModelProps, 'id'>;
  fetchFinancialTransactions: ListFunction<FinancialTransactionModelFetchMappingProps>;
  fetchFinancialTransaction: (transactionId: number) => Promise<FinancialTransactionModelFetchMappingProps[]>;
  updateFinancialTransaction: (transactionId: number, categoryId: number | undefined) => Promise<void>;

  addFinancialTransactionCategories: (categories: FinancialTransactionCategoriesModelInsertionProps[]) =>
    Promise<FinancialTransactionCategoriesModelProps[]>;
  deleteFinancialTransactionCategory: DeleteByPrimaryKeyFunction;
  fetchFinancialTransactionCategories: ListFunction<FinancialTransactionCategoriesModelProps>;
  updateFinancialTransactionCategory: UpdateFunction<FinancialTransactionCategoriesModelProps>;
};

export type PreloadIPC = {
  [IPC_EXPOSURE_PROPERTY_NAME]: IPCRendererExposedProps;
};
