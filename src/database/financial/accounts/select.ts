import { Database } from "sqlite3";
import { getJoinStatement, getSelectStatement, getTableConfigFieldNames } from "../../shared";
import { financialAccountsDatabaseTableConfig } from "./config";
import { FinancialAccountsFetchProps, FinancialAccountsModelProps } from "./types";
import { financialTransactionsDatabaseTableConfig, FinancialTransactionsModelProps } from "../transactions";
import { getDatabaseAll } from "../../shared/sql-runners";

type Model = FinancialAccountsModelProps;

export const selectFinancialAccounts = (database: Database) => {
  const { name: accountsTableName } = financialAccountsDatabaseTableConfig;
  const { name: transactionsTableName } = financialTransactionsDatabaseTableConfig;
  const {
    primaryKeys: [accountsTablePrimaryKey]
  } = getTableConfigFieldNames<Model>(financialAccountsDatabaseTableConfig.fields);
  const {
    primaryKeys: [transactionsTablePrimaryKey]
  } = getTableConfigFieldNames<FinancialTransactionsModelProps>(financialTransactionsDatabaseTableConfig.fields);
  
  const selectStatement = getSelectStatement(financialAccountsDatabaseTableConfig, []);
  const joinStatement = getJoinStatement(
    accountsTableName,
    accountsTablePrimaryKey,
    transactionsTableName,
    transactionsTablePrimaryKey
  );
  const sql = `
    SELECT ${selectStatement}, COUNT(DISTINCT ${transactionsTableName}.${transactionsTablePrimaryKey}) AS count_transactions
    FROM ${accountsTableName}
    ${joinStatement}
    GROUP BY ${accountsTableName}.${accountsTablePrimaryKey}
  `;

  return getDatabaseAll<FinancialAccountsFetchProps>(database, sql);
};
