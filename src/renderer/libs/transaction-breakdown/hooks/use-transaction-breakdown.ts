import { useEffect, useMemo, useState } from "react";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";
import { getTransactionBreakdownAggregation, getTransactionDateComparison } from "../utils";
import { useTransactionBreakdownFilterOptions } from "./use-filter-options";

export const useTransactionBreakdown = (
  transactions: FinancialTransactionModelFetchMappingProps[]
) => {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);

  const sortedTransactions = useMemo(
    () => transactions.sort(getTransactionDateComparison),
    [transactions],
  );

  const yearGroups = useMemo(
    () => getTransactionBreakdownAggregation(sortedTransactions),
    [sortedTransactions],
  );

  const {
    aggregation,
    ...filter
  } = useTransactionBreakdownFilterOptions(yearGroups);

  const handleYearToggle = (year: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedYear(isExpanded ? year : null);
    if (!isExpanded) {
      setExpandedMonth(null);
    }
  };
  const handleMonthToggle = (month: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedMonth(isExpanded ? month : null);
  };

  useEffect(() => {
    if (yearGroups.length === 1 && expandedYear === null) {
      const [{ year }] = yearGroups;
      setExpandedYear(year);
    }
  }, [yearGroups]);

  return {
    aggregation,
    expandedMonth,
    expandedYear,
    filter,
    handleMonthToggle,
    handleYearToggle,
  };
};
