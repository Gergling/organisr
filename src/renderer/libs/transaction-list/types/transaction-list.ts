import { FinancialTransactionBreakdownAggregation, TransactionBreakdownFilterProps } from "../../transaction-breakdown";

type ToggleFactory = (year: number) => (_: React.SyntheticEvent, isExpanded: boolean) => void;

export type TransactionListProps = {
  aggregation: FinancialTransactionBreakdownAggregation[];
  expandedMonth: number | null;
  expandedYear: number | null;
  filter: TransactionBreakdownFilterProps;
  handleMonthToggle: ToggleFactory;
  handleYearToggle: ToggleFactory;
};
