import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useEffect, useState } from "react";
import { TransactionListYearGroup } from "../types";

type TransactionListProps = {
  yearGroups: TransactionListYearGroup[];
}

export const TransactionList = ({ yearGroups }: TransactionListProps) => {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
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

  return (
    <div>
      {yearGroups.map(({ aggregates, year, months }) =>
        <Accordion
          expanded={expandedYear === year}
          key={year}
          onChange={handleYearToggle(year)}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            {year}: {aggregates.count}, {aggregates.credit}, {aggregates.debit}, {aggregates.net}
          </AccordionSummary>
          <AccordionDetails>
            {months.map(({ aggregates, month, transactions }) =>
              <Accordion
                expanded={expandedMonth === month}
                key={month}
                onChange={handleMonthToggle(month)}    
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  {month}: {aggregates.count}, {aggregates.credit}, {aggregates.debit}, {aggregates.net}
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
  );
};
