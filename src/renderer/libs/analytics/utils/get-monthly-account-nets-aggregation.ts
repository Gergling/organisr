import { FinancialTransactionModelProps } from "../../../../database/financial/transactions";
import { MonthlyAccountNetChartable } from "../types";
import { getAggregateTransactionNetSum } from "./get-aggregate-transaction-net-sum";
import { getMonthlyAccountNet } from "./get-monthly-account-net";
import { getMonthlyAccountNetComparison } from "./get-monthly-account-net-comparison";
import { getReducedAggregations } from "./get-reduced-aggregations";

// const getReducedAggregations = (
//   // TODO: Make a special aggregation type instead of this, and then convert that into a special line chart type.
//   aggregations: MonthlyAccountNetChartable[],
//   monthAccountNet: MonthlyAccountNet,
//   accounts: string[],
// ) => {
//   // Aggregations exist, so we check whether the last one matches the month.
//   const last = aggregations.pop() as MonthlyAccountNetChartable;

//   // If not, we need to add a new one.
//   if (last.month !== monthAccountNet.month) {
//     return [
//       ...aggregations,
//       last,
//       getAggregateTransactionNetSum(monthAccountNet, accounts),
//     ];
//   }

//   // If it does, we need to alter it.
//   // TODO: This should not be pushing.
//   // We need to pop the last one and add it back in altered.
//   return [
//     ...aggregations,
//     getAggregateTransactionNetSum(monthAccountNet, accounts, last),
//   ];
// };

export const getMonthlyAccountNetsAggregation = (
  rawTransactions: FinancialTransactionModelProps[],
): MonthlyAccountNetChartable[] => {
  const accounts: string[] = [...new Set(rawTransactions.map(({ account_temporary }) => account_temporary))];
  return rawTransactions
    .map(getMonthlyAccountNet)
    .sort(getMonthlyAccountNetComparison)
    .reduce((aggregations, transaction) => {
      // If no aggregations exist, we have nothing to check against, so make the first one.
      if (aggregations.length === 0) {
        return [getAggregateTransactionNetSum(transaction, accounts)];
      }

      return getReducedAggregations(aggregations, transaction, accounts);
    }, [] as MonthlyAccountNetChartable[]);
};
