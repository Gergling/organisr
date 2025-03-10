import { Database } from "sqlite3";

export class DatabaseCollection<Model> {
  database: Database;
  models: Model[];
  constructor(database: Database) {
    this.database = database;
    this.models = [];
  }
  set(models: Model[]) {
    this.models = models;
    return this;
  }
  isEmpty() {
    return this.models.length === 0;
  }
}
