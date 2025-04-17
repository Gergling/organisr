import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { TransactionListProps } from "../types";
import { TransactionListTable } from "./Table";

export const TransactionList = ({
  aggregation,
  expandedMonth,
  expandedYear,
  handleMonthToggle,
  handleYearToggle,
}: TransactionListProps) => {
  return (
    <div>
      {aggregation.map(({ monthBreakdown, net, year }) =>
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
                  <TransactionListTable transactions={transactions} />
                </AccordionDetails>
              </Accordion>
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};
