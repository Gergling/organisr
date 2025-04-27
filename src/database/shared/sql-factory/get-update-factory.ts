import { Database } from "sqlite3";
import { TableConfigProps } from "../types";

export const getUpdateFactory = <
  Model,
>(
  { name }: TableConfigProps<Model>,
) => {
  const getStatementQuery = (data: Partial<Model>) => Object.keys(data)
    .map((fieldName) => `${fieldName} = ?`);

  return async (
    database: Database,
    setCriteria: Partial<Model>,
    whereCriteria: Partial<Model>,
  ) => {
    // TODO: Should catch empty set criteria.
    // Like, if there's no set criteria, why are we calling the function?
    const setStatementQuery = getStatementQuery(setCriteria).join(', ');
    const whereStatementQuery = getStatementQuery(whereCriteria).join(' AND ');
    const statementSQL = `
      UPDATE ${name}
      SET ${setStatementQuery}
      WHERE ${whereStatementQuery}
    `;
    const modelData: Partial<Model> = {
      ...setCriteria,
      ...whereCriteria
    };
    const preparedStatementValues = Object.values(modelData);

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
          console.error(statementSQL, preparedStatementValues, error);
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
