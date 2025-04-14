import { useMemo, useState } from "react";
import { FinancialTransactionBreakdownAggregation } from "../types";

const SELECT_ALL = 'All';

const handleNumericSelectionFactory = (
  options: string[],
  setNumericSelection: (selection: number | null) => void,
) => (idx: number) => {
  const selected = +options[idx];
  setNumericSelection(Number.isNaN(selected) ? null : selected);
};

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
    [filterYearGroups],
  );

  const handleFilterMonthSelection = handleNumericSelectionFactory(filterMonthOptions, setFilterMonth);
  const handleFilterYearSelection = handleNumericSelectionFactory(filterYearOptions, setFilterYear);

  return {
    handleFilterMonthSelection,
    handleFilterYearSelection,
    filterMonthOptions,
    filterYearGroups,
    filterYearOptions,
  };
};
