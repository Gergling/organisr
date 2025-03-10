import { GeneralAccountTransaction } from "../../../shared/transaction";
import { TransactionListMonthGroup } from "../types";
import { getTransactionListAggregate } from "./get-transaction-list-aggregate";
import { getTransactionMonthGroupFromTransaction } from "./get-transaction-month-group-from-transaction";

export const getTransactionMonthGroups = (
  monthGroups: TransactionListMonthGroup[],
  transaction: GeneralAccountTransaction,
): TransactionListMonthGroup[] => {
  const last = monthGroups.pop() as TransactionListMonthGroup;

  // If the last month is different to the existing transaction,
  // we should expect to add a new month.
  if (last.month !== transaction.date.month) {
    return [
      ...monthGroups,
      last,
      getTransactionMonthGroupFromTransaction(transaction)
    ];
  }

  return [
    ...monthGroups,
    {
      ...last,
      aggregates: getTransactionListAggregate(last.aggregates, transaction),
      transactions: [
        ...last.transactions,
        transaction,
      ],
    }
  ];
}
