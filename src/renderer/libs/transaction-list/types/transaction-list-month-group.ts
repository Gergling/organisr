import { GeneralAccountTransaction } from "../../../../renderer/shared/transaction";
import { TransactionListAggregate } from "./transaction-list-aggregate";

export type TransactionListMonthGroup = {
  aggregates: TransactionListAggregate;
  month: number;
  transactions: GeneralAccountTransaction[];
};
