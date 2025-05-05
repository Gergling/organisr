import { Database } from "sqlite3";
import { schemas } from "./schemas";
import { getCreateSQL } from "./shared";

type SetupDatabaseResponseProps = {
  createTables: () => Promise<void[]>;
  database: Database;
};

const createTablesFactory = (database: Database) => (): Promise<void[]> => {
  const schemaData = schemas.map((schema) => ({
    schema,
    sql: getCreateSQL(schema),
  }));

  return Promise.all(schemaData.map(({ schema: { name: tableName }, sql }) => new Promise<void>((resolve, reject) => {
    database.exec(sql, (error) => {
      if (error) {
        reject({
          message: `Table creation failed for ${tableName}.`,
          error
        });
      }
      resolve();
    });
  })));
}

export const setupDatabase = (dbPath: string) => new Promise<SetupDatabaseResponseProps>((resolve, reject) => {
  const database = new Database(dbPath, (err) => {
    if (err) reject(err);

    resolve({
      createTables: createTablesFactory(database),
      database,
    });
  });
});
