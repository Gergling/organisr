import { Database } from "sqlite3";

export const getDatabaseAll = <Model>(
  database: Database,
  sql: string,
) => new Promise<Model[]>((resolve, reject) => {
  database.all<Model>(sql, (error, rows) => {
    if (error) reject({ error, sql });
    resolve(rows);
  });
});
