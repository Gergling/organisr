import { getReferenceSchema, TableConfigForeignKeyProps, TableConfigProps } from "../../shared";
import { FINANCIAL_TRANSACTION_CATEGORIES_DATABASE_TABLE_NAME } from "../transaction-categories";
import { FinancialTransactionCategoriesModelProps } from "../transaction-categories/types";
import { FinancialTransactionsModelProps } from "./types";

type TableConfig = TableConfigProps<FinancialTransactionsModelProps>;
type TableConfigCategoryReference = TableConfigForeignKeyProps<
  FinancialTransactionsModelProps,
  FinancialTransactionCategoriesModelProps
>;

export const FINANCIAL_TRANSACTIONS_DATABASE_TABLE_NAME = 'financial_transactions';

export const financialTransactionsDatabaseTableConfig: TableConfig = {
  fields: {
    account_temporary: 'TEXT', // Awful temporary solution until we get an accounts table.
    date: 'TEXT',
    description: 'TEXT',
    id: {
      primaryKey: true,
      type: 'INTEGER',
    },
    meta: 'BLOB',
    net: 'DECIMAL(10, 3)',
    category_id: {
      nullable: true,
      type: 'INTEGER',
    }
  },
  foreignKeys: [
    getReferenceSchema<TableConfigCategoryReference>({
      localFieldName: 'category_id',
      foreignTable: FINANCIAL_TRANSACTION_CATEGORIES_DATABASE_TABLE_NAME,
      foreignTableFieldName: 'id',
    })
  ],
  name: FINANCIAL_TRANSACTIONS_DATABASE_TABLE_NAME,
};
