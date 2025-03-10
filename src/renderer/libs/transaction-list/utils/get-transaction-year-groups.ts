import { GeneralAccountTransaction } from "../../../shared/transaction";
import { TransactionListYearGroup } from "../types";
import { getTransactionListAggregate } from "./get-transaction-list-aggregate";
import { getTransactionMonthGroups } from "./get-transaction-month-groups";
import { getTransactionYearGroupFromTransaction } from "./get-transaction-year-group-from-transaction";

export const getTransactionYearGroups = (
  yearGroups: TransactionListYearGroup[],
  transaction: GeneralAccountTransaction,
): TransactionListYearGroup[] => {
  const yearGroup = yearGroups.pop() as TransactionListYearGroup;

  // If the last year is different to the existing transaction,
  // we should expect to add a new year.
  if (yearGroup.year !== transaction.date.year) {
    return [
      ...yearGroups,
      yearGroup,
      getTransactionYearGroupFromTransaction(transaction),
    ];
  }

  // ... Otherwise we alter the last year.
  return [
    ...yearGroups,
    {
      ...yearGroup,
      aggregates: getTransactionListAggregate(yearGroup.aggregates, transaction),
      months: getTransactionMonthGroups(yearGroup.months, transaction),
    }
  ];
};
