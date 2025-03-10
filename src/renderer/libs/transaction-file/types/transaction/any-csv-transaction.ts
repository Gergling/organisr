import { HalifaxCurrentAccountCSVTransaction } from "./halifax-current-account-csv-transaction";
import { TransactionType } from "./transaction-types";

export type AnyTransactionType = (HalifaxCurrentAccountCSVTransaction) & {
  type: TransactionType;
};
