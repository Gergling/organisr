import { useQueryTransactions } from "../../transaction-data"
import { TransactionList } from "../../transaction-list";
import { useTransactionBreakdown } from "../hooks";
import { TransactionBreakdownFilterSelection } from "./FilterSelection";
// TODO: Apparently we've completely rewritten this, so... this is awkward...
// The credit/debit, etc aren't featured.
// Although they would be easy to calculate, so maybe that would have been the simpler answer...
// import { TransactionList } from "../../transaction-list";

export const TransactionBreakdown = () => {
  const { isLoading, transactions } = useQueryTransactions();

  const breakdown = useTransactionBreakdown(transactions);

  if (isLoading) return 'Loading...';

  return (
    <div>
      <TransactionBreakdownFilterSelection { ...breakdown.filter } />
      <TransactionList { ...breakdown} />
    </div>
  );
};
