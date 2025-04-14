import { useMemo, useState } from "react";
import { FinancialTransactionBreakdownAggregation } from "../types";

const SELECT_ALL = 'All';

// const useNumericFilterOptions = () => {

// }

export const useTransactionBreakdownFilterOptions = (
  yearGroups: FinancialTransactionBreakdownAggregation[],
) => {
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [filterMonth, setFilterMonth] = useState<number | null>(null);

  const filterYearGroups = useMemo(
    () => filterYear
      ? yearGroups
        .filter(({ year }) => year === filterYear)
        .map((yearGroup) => ({
          ...yearGroup,
          monthBreakdown: filterMonth
            ? yearGroup.monthBreakdown.filter(({ month }) => month === filterMonth)
            : yearGroup.monthBreakdown,
        }))
      : yearGroups,
    [filterMonth, filterYear, yearGroups],
  );

  const filterYearOptions = useMemo(
    () => [SELECT_ALL, ...yearGroups.map(({ year }) => year.toString())],
    [yearGroups],
  );
  const filterMonthOptions = useMemo(
    () => [
      SELECT_ALL, 
      ...[...new Set(filterYearGroups.map(({ monthBreakdown }) => monthBreakdown
        .map(({ month }) => month.toString())
      ).flat())],
    ],
    [yearGroups],
  );

  const handleFilterYearSelection = (idx: number) => {
    const selectedYear = +filterYearOptions[idx];
    setFilterYear(Number.isNaN(selectedYear) ? null : selectedYear);
  };
  const handleFilterMonthSelection = (idx: number) => {
    const selectedMonth = +filterMonthOptions[idx];
    setFilterMonth(Number.isNaN(selectedMonth) ? null : selectedMonth);
  };

  return {
    handleFilterMonthSelection,
    handleFilterYearSelection,
    filterMonthOptions,
    filterYearGroups,
    filterYearOptions,
  };
};
