import { GeneralAccountTransaction } from "../../../shared/transaction";
import { TransactionListAggregate } from "../types";

export const getTransactionListAggregate = (
  {
    count,
    credit,
    debit,
    net
  }: TransactionListAggregate,
  {
    credit: tCredit,
    debit: tDebit,
    net: tNet,
  }: GeneralAccountTransaction,
): TransactionListAggregate => ({
  count: count + 1,
  credit: credit + (tCredit || 0),
  debit: debit + (tDebit || 0),
  net: net + tNet,
});
