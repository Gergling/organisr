import { FinancialAccountsTableConfigProps } from "./types";

export const FINANCIAL_ACCOUNTS_DATABASE_TABLE_NAME = 'financial_accounts';

export const financialAccountsDatabaseTableConfig: FinancialAccountsTableConfigProps = {
  fields: {
    id: {
      type: 'INTEGER',
      primaryKey: true,
    },
    name: 'TEXT',
  },
  name: FINANCIAL_ACCOUNTS_DATABASE_TABLE_NAME,
};
