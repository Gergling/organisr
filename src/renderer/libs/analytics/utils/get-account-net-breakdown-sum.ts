import { MonthlyAccountNetChartable } from "../types/monthly-account-net-chartable";

export const getAccountNetBreakdownSum = (
  a: MonthlyAccountNetChartable,
  b: MonthlyAccountNetChartable,
  keys: string[],
): MonthlyAccountNetChartable => keys.reduce((breakdown, key) => ({
  ...breakdown,
  accounts: {
    ...breakdown.accounts,
    [key]: a.accounts[key] + b.accounts[key],
  },
}), {
  month: a.month,
  accounts: {},
});
