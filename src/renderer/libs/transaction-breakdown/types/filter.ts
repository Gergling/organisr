type NumericSelection = (selection: number | null) => void;

export type TransactionBreakdownFilterProps = {
  filterMonthOptions: string[];
  filterYearOptions: string[];
  handleFilterMonthSelection: NumericSelection;
  handleFilterYearSelection: NumericSelection;
};
