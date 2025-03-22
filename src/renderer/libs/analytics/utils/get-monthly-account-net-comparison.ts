import { MonthlyAccountNet } from "../types";

export const getMonthlyAccountNetComparison = (
  a: MonthlyAccountNet,
  b: MonthlyAccountNet
) => {
  const month = a.month.localeCompare(b.month);
  if (month !== 0) return month;
  return a.account.localeCompare(b.account);
};
