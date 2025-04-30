import { Database } from "sqlite3";
import { financialAccountsDatabaseTableConfig } from "./config";
import { getStatement } from "../../shared";

export const deleteFinancialAccount = (
  database: Database,
  id: number,
) => {
  const statementSQL = `DELETE FROM ${financialAccountsDatabaseTableConfig.name} WHERE id = ?`;
  const preparedStatementValues = [id];
  return getStatement<void>(
    'account-delete',
    database,
    statementSQL,
    preparedStatementValues,
    ({ executionCallback, resolve, statement }) => statement.run(
      preparedStatementValues,
      (error) => {
        executionCallback(error);
        resolve();
      }
    ),
  );
};
