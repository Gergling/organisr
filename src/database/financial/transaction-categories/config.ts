import { getReferenceSchema, TableConfigForeignKeyProps } from "../../shared";
import { FinancialTransactionCategoriesModelProps, FinancialTransactionCategoriesTableConfigProps } from "./types";

export const FINANCIAL_TRANSACTION_CATEGORIES_DATABASE_TABLE_NAME = 'financial_transaction_categories';

export const financialTransactionCategoriesDatabaseTableConfig: FinancialTransactionCategoriesTableConfigProps = {
  fields: {
    id: {
      type: 'INTEGER',
      primaryKey: true,
    },
    name: 'TEXT',
    parent_id: {
      nullable: true,
      type: 'INTEGER',
    }
  },
  foreignKeys: [
    getReferenceSchema<TableConfigForeignKeyProps<
      FinancialTransactionCategoriesModelProps,
      FinancialTransactionCategoriesModelProps
    >>({
      localFieldName: 'parent_id',
      foreignTable: FINANCIAL_TRANSACTION_CATEGORIES_DATABASE_TABLE_NAME,
      foreignTableKeyFieldName: 'id',
      foreignTableSelectFieldNames: [],
    }),
  ],
  name: FINANCIAL_TRANSACTION_CATEGORIES_DATABASE_TABLE_NAME,
};
