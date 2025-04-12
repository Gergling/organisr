import { Database } from "sqlite3";
import { TableConfigProps } from "./types";
import { getTableConfigFieldNames } from "./get-fields";

export const getInsertFactory = <
  Model,
>(
  { name, fields }: TableConfigProps<Model>,
) => {
  const { fieldNames } = getTableConfigFieldNames<Model>(fields);

  return (
    database: Database,
    data: Model[],
  ) => {
    return new Promise<void>((resolve, reject) => {
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
            .map((fieldName) => category[fieldName as keyof Model]);
          return [
            ...values,
            ...transactionRowData,
          ];
        }, []);
      const statementSQL = `
        INSERT INTO ${name} (${fieldNames.join(', ')})
        VALUES ${preparedStatementQuery}
      `;
      const statement = database.prepare(statementSQL);

      statement.run(preparedStatementValues, (error) => {
        if (error) {
          console.error(error);
          reject({
            message: error.message,
            type: 'insert-statement-failed',
          });
        }

        resolve();
      });
    });
  };
};
