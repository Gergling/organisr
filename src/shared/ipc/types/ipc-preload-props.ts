import { IPC_EXPOSURE_PROPERTY_NAME } from "../../../ipc/ipc-constants";
import {
  FinancialAccountsFetchProps,
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

type LegacyUpdateFunction<Model> = (
  model: Model
) => Promise<void>;

type UpdateFunction<Model, PrimaryKeyField extends keyof Model> = (
  primaryKeyId: Model[PrimaryKeyField],
  data: Partial<Omit<Model, PrimaryKeyField>> & { [fieldName in PrimaryKeyField]?: never; },
) => Promise<void>;

export type IPCRendererExposedProps = {
  ipcTest: (message: string) => Promise<string>;
  dangerouslyExposedSQLInjector: (sql: string) => Promise<{ [key: string]: string }[]>;

  createFinancialAccounts: CreateFunction<FinancialAccountsModelProps, 'id'>;
  deleteFinancialAccounts: DeleteByPrimaryKeyFunction;
  listFinancialAccounts: ListFunction<FinancialAccountsFetchProps>;
  updateFinancialAccounts: LegacyUpdateFunction<FinancialAccountsModelProps>;

  addFinancialTransactions: CreateFunction<FinancialTransactionsModelProps, 'id'>;
  fetchFinancialTransactions: ListFunction<FinancialTransactionModelFetchMappingProps>;
  fetchFinancialTransaction: (transactionId: number) => Promise<FinancialTransactionModelFetchMappingProps[]>;
  updateFinancialTransaction: UpdateFunction<FinancialTransactionsModelProps, 'id'>;

  addFinancialTransactionCategories: (categories: FinancialTransactionCategoriesModelInsertionProps[]) =>
    Promise<FinancialTransactionCategoriesModelProps[]>;
  deleteFinancialTransactionCategory: DeleteByPrimaryKeyFunction;
  fetchFinancialTransactionCategories: ListFunction<FinancialTransactionCategoriesModelProps>;
  updateFinancialTransactionCategory: LegacyUpdateFunction<FinancialTransactionCategoriesModelProps>;
};

export type PreloadIPC = {
  [IPC_EXPOSURE_PROPERTY_NAME]: IPCRendererExposedProps;
};
