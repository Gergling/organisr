import { MonthlyAccountNet } from "../types";
import { MonthlyAccountNetChartable } from "../types/monthly-account-net-chartable";
import { getAccountNetBreakdownSum } from "./get-account-net-breakdown-sum";

const getEmptyAccountNets = (
  accounts: string[]
): MonthlyAccountNetChartable['accounts'] => accounts.reduce((breakdown, key) => ({
  ...breakdown,
  [key]: 0
}), {})

export const getAggregateTransactionNetSum = (
  {
    account,
    month,
    net,
  }: MonthlyAccountNet,
  accounts: string[],
  aggregate?: MonthlyAccountNetChartable,
): MonthlyAccountNetChartable => {
  const monthAccountNetChartable: MonthlyAccountNetChartable = {
    accounts: getEmptyAccountNets(accounts),
    month,
  };
  monthAccountNetChartable.accounts[account] = net;
  if (aggregate) {
    return {
      ...monthAccountNetChartable, // Technically this is just the month property.
      ...getAccountNetBreakdownSum(aggregate, monthAccountNetChartable, accounts),
    };
  }
  return monthAccountNetChartable;
};
