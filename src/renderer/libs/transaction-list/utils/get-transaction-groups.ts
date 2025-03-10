import { GeneralAccountTransaction } from "../../../shared/transaction";
import { TransactionListYearGroup } from "../types";
import { getTransactionYearGroupFromTransaction } from "./get-transaction-year-group-from-transaction";
import { getTransactionYearGroups } from "./get-transaction-year-groups";

/**
 * 
 * @param sortedTransactions This function will only work if the transactions are sorted by
 * date, e.g. getSortedTransactions.
 */
export const getTransactionGroups = (
  sortedTransactions: GeneralAccountTransaction[]
): TransactionListYearGroup[] => sortedTransactions
  .reduce<TransactionListYearGroup[]>((accumulated, transaction) => {
    if (accumulated.length === 0) {
      return [getTransactionYearGroupFromTransaction(transaction)];
    }

    return getTransactionYearGroups(accumulated, transaction);
  }, []);
