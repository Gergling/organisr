import { GeneralAccountTransaction } from "../../../shared/transaction";
import { TransactionListYearGroup } from "../types";
import { getTransactionMonthGroupFromTransaction } from "./get-transaction-month-group-from-transaction";

export const getTransactionYearGroupFromTransaction = (
  transaction: GeneralAccountTransaction
): TransactionListYearGroup => {
  const { credit, date: { year }, debit, net } = transaction;
  return {
    aggregates: {
      count: 1,
      credit: credit || 0,
      debit: debit || 0,
      net,
    },
    months: [getTransactionMonthGroupFromTransaction(transaction)],
    year,
  };
};
