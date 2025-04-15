import { useMemo, useState } from "react";
import { FinancialTransactionBreakdownAggregation, TransactionBreakdownFilterProps } from "../types";

type FilterOptionsProps = TransactionBreakdownFilterProps & {
  aggregation: FinancialTransactionBreakdownAggregation[];
};

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
): FilterOptionsProps => {
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [filterMonth, setFilterMonth] = useState<number | null>(null);

  const aggregation = useMemo(
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
      ...[...new Set(aggregation.map(({ monthBreakdown }) => monthBreakdown
        .map(({ month }) => month.toString())
      ).flat())],
    ],
    [aggregation],
  );

  const handleFilterMonthSelection = handleNumericSelectionFactory(filterMonthOptions, setFilterMonth);
  const handleFilterYearSelection = handleNumericSelectionFactory(filterYearOptions, setFilterYear);

  return {
    aggregation,
    filterMonthOptions,
    filterYearOptions,
    handleFilterMonthSelection,
    handleFilterYearSelection,
  };
};
