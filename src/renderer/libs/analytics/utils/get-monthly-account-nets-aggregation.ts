import { getAggregation } from "../../../../shared/aggregator";
import { FinancialTransactionsModelProps } from "../../../../database/financial/transactions";
import { MonthlyAccountNetChartable } from "../types";

export const getMonthlyAccountNetsAggregation = (
  rawTransactions: FinancialTransactionsModelProps[],
): MonthlyAccountNetChartable[] => {
  const aggregation = getAggregation<
    FinancialTransactionsModelProps,
    MonthlyAccountNetChartable
  >(
    rawTransactions,
    ({ date }) => {
      const [year, month] = date.split('-');
      return [year, month].join('-');
    },
    (aggregation, { account_temporary, net }, { key }) => {
      return {
        ...aggregation,
        accounts: {
          ...aggregation.accounts,
          [account_temporary]: ((aggregation.accounts || {})[account_temporary] || 0) + net,
        },
        month: key,
      };
    },
  ).map(({ values }) => values);

  return aggregation.sort((a, b) => a.month.localeCompare(b.month))
};
