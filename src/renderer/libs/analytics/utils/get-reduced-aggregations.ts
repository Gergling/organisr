// TODO: I'm pretty sure this is dead code.

import { MonthlyAccountNet, MonthlyAccountNetChartable } from "../types";
import { getAggregateTransactionNetSum } from "./get-aggregate-transaction-net-sum";

export const getReducedAggregations = (
  // TODO: Make a special aggregation type instead of this, and then convert that into a special line chart type.
  aggregations: MonthlyAccountNetChartable[],
  monthAccountNet: MonthlyAccountNet,
  accounts: string[],
) => {
  // Aggregations exist, so we check whether the last one matches the month.
  const last = aggregations.pop() as MonthlyAccountNetChartable;

  // If not, we need to add a new one.
  if (last.month !== monthAccountNet.month) {
    return [
      ...aggregations,
      last,
      getAggregateTransactionNetSum(monthAccountNet, accounts),
    ];
  }

  // If it does, we need to alter it.
  // TODO: This should not be pushing.
  // We need to pop the last one and add it back in altered.
  return [
    ...aggregations,
    getAggregateTransactionNetSum(monthAccountNet, accounts, last),
  ];
};
