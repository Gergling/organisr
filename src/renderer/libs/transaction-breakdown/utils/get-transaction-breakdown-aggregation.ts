import { Aggregation, getAggregation } from "../../../../shared/aggregator";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";
import { FinancialTransactionBreakdownAggregation, FinancialTransactionBreakdownAggregationMonth, FinancialTransactionBreakdownAggregationYear } from "../types";

const getMonthAggregation = (transactions: FinancialTransactionModelFetchMappingProps[]) => getAggregation<
  FinancialTransactionModelFetchMappingProps,
  FinancialTransactionBreakdownAggregationMonth
>(
  transactions,
  // TODO: Do we need a pre-calculation function?
  // We could get the year and month calculated once.
  // Ideally an initialisation function for an empty aggregation would be good.
  // We only need it for the values though. Not the key.
  ({ date }) => {
    const [year, month] = date.split('-');
    return [year, month].join('-');
  },
  (aggregation, { net }, { key }) => {
    const [year, month] = key.split('-');
    const aggregatedNet = (aggregation.net || 0) + net;
    return {
      ...aggregation,
      month: +month,
      net: aggregatedNet,
      year: +year,
    };
  }
);

const getYearAggregation = (
  monthAggregations: Aggregation<
    FinancialTransactionModelFetchMappingProps,
    FinancialTransactionBreakdownAggregationMonth
  >[]
) => getAggregation<
  Aggregation<
    FinancialTransactionModelFetchMappingProps,
    FinancialTransactionBreakdownAggregationMonth
  >,
  FinancialTransactionBreakdownAggregationYear
>(
  monthAggregations,
  ({ values: { year } }) => year.toString(),
  (aggregation, { values: { net } }, { key }) => {
    const aggregatedNet = (aggregation.net || 0) + net;
    return {
      ...aggregation,
      net: aggregatedNet,
      year: +key,
    };
  }
);

// TODO: This function is hysterically inefficient.
// The generic aggregation function is great, but it loops through
// the whole transaction list twice. Only one loop is required, with
// two levels of aggregation (year and month).
// TODO: Month-on-month growth. Technically this is just the net.
// Balances will need to be handled differently. For one thing, we
// don't need to do anything about them.
// Credit limits will be handled at an account level (e.g. overdraft,
// any credit card, loans maybe).
// HOWEVER we can still calculate the net difference if we wanted to.
// For that matter, is the default last month with negative net worth
// it? Mainly we just wanted a list of transactions we can edit/delete
// later.
export const getTransactionBreakdownAggregation = (
  transactions: FinancialTransactionModelFetchMappingProps[]
): FinancialTransactionBreakdownAggregation[] => {
  const monthAggregation = getMonthAggregation(transactions);
  const yearAggregation = getYearAggregation(monthAggregation);
  return yearAggregation.map(({ items, values: { net, year } }) => ({
    monthBreakdown: items.map(({ items, values: { month, net } }) => ({
      month,
      net,
      transactions: items,
    })),
    net,
    year,
  }));
};
