import { Temporal } from "@js-temporal/polyfill";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";

export const getTransactionDateComparison = (
  a: FinancialTransactionModelFetchMappingProps,
  b: FinancialTransactionModelFetchMappingProps
) => Temporal.PlainDate.compare(a.date, b.date);
