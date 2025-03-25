// TODO: I'm pretty sure this is dead code.

import { FinancialTransactionModelProps } from "../../../../database/financial/transactions";
import { MonthlyAccountNet } from "../types";

export const getMonthlyAccountNet = (
  { account_temporary, date, net }: FinancialTransactionModelProps,
): MonthlyAccountNet => {
  const [year, month] = date.split('-');
  return {
    account: account_temporary,
    month: `${year}-${month}`,
    net,
  };
};
