import { BaseCSVTransaction } from "./base-csv-transaction";

export type HalifaxCurrentAccountCSVTransaction = BaseCSVTransaction & {
  'Account Number': string;
  'Balance': string;
  'Credit Amount': string;
  'Debit Amount': string;
  'Sort Code': string;
  'Transaction Date': string;
  'Transaction Description': string;
  'Transaction Type': string;
};
