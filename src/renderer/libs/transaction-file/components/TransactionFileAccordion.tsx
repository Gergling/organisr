import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { getTransactionGroups, TransactionListDeprecating, TransactionListYearGroup } from "../../transaction-list";
import { getGeneralAccountTransaction, TransactionFileData } from "../../transaction-manager";
import { useMemo } from "react";
import { getSortedTransactions } from "../../transaction-list/utils/get-sorted-transactions";
import { DownloadDone } from "../../../shared/icons";
import { GeneralAccountTransaction } from "../../../shared/transaction";
import { getFormattedCurrency } from "../../../shared/currency-format";

type TransactionFileAccordionProps = {
  isExpanded: boolean;
  setIsExpanded: (e: React.SyntheticEvent, isExpanded: boolean) => void;
  transactionFile: TransactionFileData;
}

const getDateRange = (sortedTransactions: GeneralAccountTransaction[]) => ({
  start: sortedTransactions[0].date,
  end: sortedTransactions[sortedTransactions.length - 1].date,
});

const getMonthlyMeans = (yearGroups: TransactionListYearGroup[]) => {
  const sums = yearGroups.reduce(({
    credit,
    debit,
    months,
  }, { aggregates, months: yearGroupMonths }) => {
    return {
      credit: credit + aggregates.credit,
      debit: debit + aggregates.debit,
      months: months + yearGroupMonths.length,
    };
  }, {
    credit: 0,
    debit: 0,
    months: 0,
  });

  return {
    credit: sums.credit / sums.months,
    debit: sums.debit / sums.months,
  };
}

export const TransactionFileAccordion = ({
  isExpanded,
  setIsExpanded,
  transactionFile: {
    data,
    name,
  }
}: TransactionFileAccordionProps) => {
  const transactions = useMemo(
    () => (data || []).map(getGeneralAccountTransaction),
    [data, getGeneralAccountTransaction],
  );
  const sortedTransactions = useMemo(
    () => getSortedTransactions(transactions),
    [getSortedTransactions, transactions],
  );
  const yearGroups = useMemo(
    () => getTransactionGroups(sortedTransactions),
    [getTransactionGroups, sortedTransactions],
  );

  const aggregates = useMemo(
    () => ({
      ...getDateRange(sortedTransactions),
      ...getMonthlyMeans(yearGroups),
    }),
    [sortedTransactions, yearGroups],
  );

  return (
    <Accordion
      expanded={isExpanded}
      onChange={setIsExpanded}
    >
      <AccordionSummary expandIcon={data && <ExpandMore />}>
        <DownloadDone /> {name}: {data.length} rows,
        {aggregates.start.toString()} to {aggregates.end.toString()},
        {getFormattedCurrency(aggregates.credit)} mean monthly credit,
        {getFormattedCurrency(aggregates.debit)} mean monthly debit
      </AccordionSummary>
      <AccordionDetails>
        {data && <TransactionListDeprecating yearGroups={yearGroups} />}
      </AccordionDetails>
    </Accordion>
  );
};
