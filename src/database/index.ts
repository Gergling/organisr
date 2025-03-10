import { Database } from "sqlite3";
import tableCreationQueries from "./table-creations";
import { IPCMutationResponse } from "../shared/ipc";

// Rudimentary database wrapper... I don't remember why I thought I needed it.

class MyDatabaseWrapper {
  database: Database;
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  init() {
    return new Promise<void>((resolve, reject) => {
      this.database = new Database(this.path, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
  // TODO: Should think about prepared statements
  exec(sql: string) {
    return new Promise<IPCMutationResponse>((resolve, reject) => {
      this.database.exec(sql, (error) => {
        if (error) reject(error);
        resolve({ data: true });
      });
    });
  }
  async runSetupQueries() {
    const responses: boolean[] = [];
    for (let i = 0; i < tableCreationQueries.length; i += 1) {
      const query = tableCreationQueries[i];
      try {
        const { data } = await this.exec(query);
        responses.push(!!data);
      } catch(error) {
        responses.push(false);
        throw new Error(`Setup query failed at ${i}: ${error}`);
      }
    }
  }

  stuff<DataResponse>(sql: string) {
    return new Promise<DataResponse[]>((resolve, reject) => {
      this.database.all<DataResponse>(sql, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
}

export const getDatabaseInstance = (path: string) => new MyDatabaseWrapper(path);
