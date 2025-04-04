
import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useMemo, useState } from "react";
import { useQueryTransactions } from "../../transaction-data"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Aggregation, getAggregation } from "../../../../shared/aggregator";
import { FinancialTransactionsModelProps } from "../../../../database/financial/transactions";
import { Dropdown } from "../../../shared/dropdown";
// TODO: Apparently we've completely rewritten this, so... this is awkward...
// The credit/debit, etc aren't featured.
// Although they would be easy to calculate, so maybe that would have been the simpler answer...
// import { TransactionList } from "../../transaction-list";

type FinancialTransactionMonthAggregation = {
  month: number;
  net: number;
  year: number;
};
type FinancialTransactionYearAggregation = {
  net: number;
  year: number;
};
type FinancialTransactionAggregation = FinancialTransactionYearAggregation & {
  monthBreakdown: (Omit<FinancialTransactionMonthAggregation, 'year'> & {
    transactions: FinancialTransactionsModelProps[];
  })[];
}

const getTransactionDateComparison = (
  a: FinancialTransactionsModelProps,
  b: FinancialTransactionsModelProps
) => Temporal.PlainDate.compare(a.date, b.date);

const getMonthAggregation = (transactions: FinancialTransactionsModelProps[]) => getAggregation<
  FinancialTransactionsModelProps,
  FinancialTransactionMonthAggregation
>(
  transactions,
  // TODO: Do we need a pre-calculation function?
  // We could get the year and month calculated once.
  // Ideally an initialisation function for an empty aggregation would be good.
  // We only need it for the values though. Not the key.
  ({ date }) => {
    const [year, month] = date.split('-');
    return [year, month].join('-');
  },
  (aggregation, { net }, { key }) => {
    const [year, month] = key.split('-');
    const aggregatedNet = (aggregation.net || 0) + net;
    return {
      ...aggregation,
      month: +month,
      net: aggregatedNet,
      year: +year,
    };
  }
);

const getYearAggregation = (
  monthAggregations: Aggregation<
    FinancialTransactionsModelProps,
    FinancialTransactionMonthAggregation
  >[]
) => getAggregation<
  Aggregation<
    FinancialTransactionsModelProps,
    FinancialTransactionMonthAggregation
  >,
  FinancialTransactionYearAggregation
>(
  monthAggregations,
  ({ values: { year } }) => year.toString(),
  (aggregation, { values: { net } }, { key }) => {
    const aggregatedNet = (aggregation.net || 0) + net;
    return {
      ...aggregation,
      net: aggregatedNet,
      year: +key,
    };
  }
);

// TODO: This function is hysterically inefficient.
// The generic aggregation function is great, but it loops through
// the whole transaction list twice. Only one loop is required, with
// two levels of aggregation (year and month).
// TODO: Month-on-month growth. Technically this is just the net.
// Balances will need to be handled differently. For one thing, we
// don't need to do anything about them.
// Credit limits will be handled at an account level (e.g. overdraft,
// any credit card, loans maybe).
// HOWEVER we can still calculate the net difference if we wanted to.
// For that matter, is the default last month with negative net worth
// it? Mainly we just wanted a list of transactions we can edit/delete
// later.
const getTransactionbreakdownAggregation = (
  transactions: FinancialTransactionsModelProps[]
): FinancialTransactionAggregation[] => {
  const monthAggregation = getMonthAggregation(transactions);
  const yearAggregation = getYearAggregation(monthAggregation);
  return yearAggregation.map(({ items, values: { net, year } }) => ({
    monthBreakdown: items.map(({ items, values: { month, net } }) => ({
      month,
      net,
      transactions: items,
    })),
    net,
    year,
  }));
};

const SELECT_ALL = 'All';

export const TransactionBreakdown = () => {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [filterMonth, setFilterMonth] = useState<number | null>(null);
  const { isLoading, transactions } = useQueryTransactions();

  const sortedTransactions = useMemo(
    () => transactions.sort(getTransactionDateComparison),
    [transactions],
  );

  const yearGroups = useMemo(
    () => getTransactionbreakdownAggregation(sortedTransactions),
    [sortedTransactions],
  );

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

  const handleYearToggle = (year: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedYear(isExpanded ? year : null);
    if (!isExpanded) {
      setExpandedMonth(null);
    }
  };
  const handleMonthToggle = (month: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedMonth(isExpanded ? month : null);
  };

  const handleFilterYearSelection = (idx: number) => {
    const selectedYear = +filterYearOptions[idx];
    setFilterYear(Number.isNaN(selectedYear) ? null : selectedYear);
  };
  const handleFilterMonthSelection = (idx: number) => {
    const selectedMonth = +filterMonthOptions[idx];
    setFilterMonth(Number.isNaN(selectedMonth) ? null : selectedMonth);
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
                        date,
                        description,
                        net,
                      }, idx) => <li key={idx}>{date.toString()}: {net}, {description}</li>)}
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
