import { Database } from "sqlite3";
import { TableConfigProps } from "./types";
import { getTableConfigFieldNames } from "./get-fields";

export const getUpdateFactory = <
  Model,
>(
  { name, fields }: TableConfigProps<Model>,
) => {
  const {
    fieldNames,
    primaryKeys,
  } = getTableConfigFieldNames<Model>(fields);
  const getExpression = (
    fieldName: keyof Model,
  ): string => `${fieldName.toString()} = ?`;

  return async (
    database: Database,
    data: Model,
  ) => {
    const setStatementQuery = fieldNames.map(getExpression).join(', ');
    const whereStatementQuery = primaryKeys.map(getExpression).join(' AND ');
    const statementSQL = `
      UPDATE ${name}
      SET ${setStatementQuery}
      WHERE ${whereStatementQuery}
    `;
    const preparedStatementValues = [
      ...fieldNames,
      ...primaryKeys,
    ].map((fieldName) => data[fieldName]);

    return new Promise<void>((resolve, reject) => {
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
          console.error(error);
          reject({
            message: error.message,
            type: 'update-statement-failed',
          });
        }
  
        resolve();
      });
    });
  }
}
