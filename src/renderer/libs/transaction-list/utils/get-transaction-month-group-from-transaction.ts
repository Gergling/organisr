import { GeneralAccountTransaction } from "../../../shared/transaction";
import { TransactionListMonthGroup } from "../types";

export const getTransactionMonthGroupFromTransaction = (
  transaction: GeneralAccountTransaction
): TransactionListMonthGroup => {
  const { credit, date: { month }, debit, net } = transaction;
  return {
    aggregates: {
      count: 1,
      credit: credit || 0,
      debit: debit || 0,
      net,
    },
    month,
    transactions: [transaction]
  };
};
