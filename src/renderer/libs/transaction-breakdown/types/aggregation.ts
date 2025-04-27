import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";
import { FinancialTransactionBreakdownAggregationMonth } from "./aggregation-month";
import { FinancialTransactionBreakdownAggregationYear } from "./aggregation-year";

export type FinancialTransactionBreakdownAggregation = FinancialTransactionBreakdownAggregationYear & {
  monthBreakdown: (Omit<FinancialTransactionBreakdownAggregationMonth, 'year'> & {
    transactions: FinancialTransactionModelFetchMappingProps[];
  })[];
};
