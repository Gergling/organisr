// import { Database } from "sqlite3";

export default [
  `CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS transactions (
    account_temporary TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    id INTEGER PRIMARY KEY,
    meta BLOB,
    net DECIMAL(10, 3) NOT NULL
  )`
];
