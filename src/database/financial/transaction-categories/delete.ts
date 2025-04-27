import { financialTransactionCategoriesDatabaseTableConfig } from "./config";
import { Database } from "sqlite3";

// TODO: Come back to the delete factory later when we have more deletion query precedents.
export const deleteFinancialTransactionCategories = (
  database: Database,
  id: number,
) => new Promise<void>((resolve, reject) => {
  const statementSQL = `DELETE FROM ${financialTransactionCategoriesDatabaseTableConfig.name} WHERE id = ?`;
  const preparedStatementValues = [id];
  console.log('handleDeleteFactory', id, statementSQL)
  const statement = database.prepare(statementSQL, (error) => {
    if (error) {
      console.error(error);
      reject({
        message: error.message,
        type: 'update-prepare-failed',
      });
    }
  });

  statement.run(preparedStatementValues, (error) => {
    if (error) {
      console.error(statementSQL, preparedStatementValues, error);
      reject({
        message: error.message,
        type: 'update-statement-failed',
      });
    }

    resolve();
  });
});
