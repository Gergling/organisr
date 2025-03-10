import { HalifaxCurrentAccountCSVTransaction } from "./transaction/halifax-current-account-csv-transaction";

export type TransactionFileMeta = {
  id: string;
  name: string;
  data?: HalifaxCurrentAccountCSVTransaction[]; // Type should be updated to reflect what is coming out of sheets.
};
