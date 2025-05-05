import { Database } from "sqlite3";
import { TableConfigProps } from "../types";
import { getTableConfigFieldNames } from "../get-table-config-field-names";

export const getInsertFactory = <
  Model,
  PrimaryKey extends keyof Model,
>(
  { name, fields }: TableConfigProps<Model>,
) => {
  type InsertionModel = Omit<Model, PrimaryKey>;
  const { fieldNames } = getTableConfigFieldNames<InsertionModel>(fields);

  return (
    database: Database,
    data: InsertionModel[],
  ) => {
    return new Promise<Model[]>((resolve, reject) => {
      if (data.length === 0) {
        reject({
          message: 'There is no data in this insertion request... what did you think this would do?',
          type: 'insert-no-data',
        });
      }

      const preparedStatementQuery = data
        .map(() => `(${fieldNames.map(() => '?').join(', ')})`)
        .join(', ');
      const preparedStatementValues = data
        .reduce((values, category) => {
          // This ensures the values are in the same order as the fields.
          const transactionRowData = fieldNames
            .map((fieldName) => category[fieldName as keyof InsertionModel]);
          return [
            ...values,
            ...transactionRowData,
          ];
        }, []);
      const statementSQL = `
        INSERT INTO ${name} (${fieldNames.join(', ')})
        VALUES ${preparedStatementQuery}
        RETURNING *
      `;
      const statement = database.prepare(statementSQL);

      statement.all<Model>(preparedStatementValues, (error, rows) => {
        if (error) {
          console.error(error);
          reject({
            message: error.message,
            type: 'insert-statement-failed',
          });
        }

        resolve(rows);
      });
    });
  };
};
