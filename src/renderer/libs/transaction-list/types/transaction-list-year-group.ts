import { TransactionListAggregate, TransactionListMonthGroup } from "./";

export type TransactionListYearGroup = {
  aggregates: TransactionListAggregate;
  year: number;
  months: TransactionListMonthGroup[];
}
