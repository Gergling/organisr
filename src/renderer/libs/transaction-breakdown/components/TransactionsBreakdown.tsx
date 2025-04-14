import { useEffect, useMemo, useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Dropdown } from "../../../shared/dropdown";
import { useQueryTransactions } from "../../transaction-data"
import { getTransactionBreakdownAggregation, getTransactionDateComparison } from "../utils";
import { useTransactionBreakdownFilterOptions } from "../hooks";
// TODO: Apparently we've completely rewritten this, so... this is awkward...
// The credit/debit, etc aren't featured.
// Although they would be easy to calculate, so maybe that would have been the simpler answer...
// import { TransactionList } from "../../transaction-list";

export const TransactionBreakdown = () => {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
  const { isLoading, transactions } = useQueryTransactions();

  const sortedTransactions = useMemo(
    () => transactions.sort(getTransactionDateComparison),
    [transactions],
  );

  const yearGroups = useMemo(
    () => getTransactionBreakdownAggregation(sortedTransactions),
    [sortedTransactions],
  );

  const {
    filterMonthOptions,
    filterYearGroups,
    filterYearOptions,
    handleFilterMonthSelection,
    handleFilterYearSelection,
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

  if (isLoading) return 'Loading...';

  return (
    <div>
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
      <div>
        {filterYearGroups.map(({ monthBreakdown, net, year }) =>
          <Accordion
            expanded={expandedYear === year}
            key={year}
            onChange={handleYearToggle(year)}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              {year}: {net}
            </AccordionSummary>
            <AccordionDetails>
              {monthBreakdown.map(({ month, net, transactions }) =>
                <Accordion
                  expanded={expandedMonth === month}
                  key={month}
                  onChange={handleMonthToggle(month)}    
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    {month}: {net}
                  </AccordionSummary>
                  <AccordionDetails>
                    <ol>
                      {transactions.map(({
                        // category_id,
                        categoryName,
                        date,
                        description,
                        net,
                      }, idx) => <li key={idx}>{date.toString()}: {net}, {description} {categoryName}</li>)}
                    </ol>
                  </AccordionDetails>
                </Accordion>
              )}
            </AccordionDetails>
          </Accordion>
        )}
      </div>
    </div>
  );
};
