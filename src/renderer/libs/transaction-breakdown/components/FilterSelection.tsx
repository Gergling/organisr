import { Dropdown } from "../../../shared/dropdown";
import { TransactionBreakdownFilterProps } from "../types";

export const TransactionBreakdownFilterSelection = ({
  filterMonthOptions,
  filterYearOptions,
  handleFilterMonthSelection,
  handleFilterYearSelection,
}: TransactionBreakdownFilterProps) => {
  return (
    <div>
      <Dropdown
        onSelect={handleFilterYearSelection}
        options={filterYearOptions}
      />
      <Dropdown
        onSelect={handleFilterMonthSelection}
        options={filterMonthOptions}
      />
    </div>
  );
};
