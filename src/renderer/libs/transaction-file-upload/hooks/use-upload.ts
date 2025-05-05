import { useEffect, useMemo, useState } from "react";
import { parse } from "papaparse";
import { FinancialAccountsFetchProps, FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";
import { getAggregation } from "../../../../shared/aggregator";
import { useTransactionsIPC } from "../../transaction-data";
import { useAccountsIPC } from "../../accounts";
import { CSVProps } from "../types";
import { getTransactionMapFromHalifaxCurrent } from "../utils";
import { Temporal } from "@js-temporal/polyfill";

type AccountTransactions = {
  earliest: Temporal.PlainDate;
  latest: Temporal.PlainDate;
};

const getTransactionPlaindate = ({ date }: { date: string }) => {
  const [year, month, day] = date.split('-');
  return new Temporal.PlainDate(+year, +month, +day);
}

const getAccountAggregations = (
  allAccounts: FinancialAccountsFetchProps[],
  transactions: FinancialTransactionModelFetchMappingProps[],
) => {
  const accountAggregations = getAggregation<
    FinancialTransactionModelFetchMappingProps,
    AccountTransactions
  >(
    transactions,
    ({ account_id }) => account_id?.toString() || '',
    (
      aggregation,
      transaction
    ) => {
      const date = getTransactionPlaindate(transaction);
      const dates = [date, aggregation.earliest, aggregation.latest].filter(Boolean).sort(Temporal.PlainDate.compare);
      const earliest = dates[0];
      const latest = dates[dates.length - 1];

      return {
        earliest,
        latest,
      };
    }
  );
  return allAccounts.map((account) => {
    const { id } = account;
    const accountAggregation = accountAggregations.find(({ key }) => key === id.toString());

    if (accountAggregation) {
      const { items: transactions, values: aggregation } = accountAggregation;
      return {
        account,
        aggregation: {
          earliest: aggregation.earliest.toLocaleString(),
          latest: aggregation.latest.toLocaleString(),
        },
        transactions,
      };
    }

    return {
      account,
    }
  });
}

export const useTransactionFileUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [accountId, setAccountId] = useState<number | undefined>();

  const { insert, transactions } = useTransactionsIPC();
  const { allAccounts } = useAccountsIPC();

  const getHandlePickFiles = (accountId: number) => (e: React.SyntheticEvent) => {
    const { files } = (e.target as HTMLInputElement);
    setFiles(files);
    setAccountId(accountId);
  };

  const allAccountTransactions = useMemo(
    () => {
      return getAccountAggregations(allAccounts || [], transactions || []);
    },
    [allAccounts, transactions]
  );

  useEffect(() => {
    if (files && accountId) {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        // TODO: Type a generic, open-ended mapping of strings for now.
        // Use one (probably existing) function for Halifax current account data
        // transactions.
        parse<CSVProps>(file, {
          delimiter: ',',
          complete: (results) => {
            // Send it straight to the backend somehow.
            // TODO: For now we'll assume it's always a Halifax current account.
            // TODO: We'll need to provide the option of overriding the month completely.
            const transactions = results.data
              .map(getTransactionMapFromHalifaxCurrent)
              .map((transaction) => ({ ...transaction, account_id: accountId }));
            insert(transactions, {
              onSettled: () => {
                setFiles(null);
                setAccountId(undefined);
              }
            });
          },
          header: true,
          skipEmptyLines: true,
        });
      }
    }
  }, [files]);

  return {
    allAccountTransactions,
    files,
    getHandlePickFiles,
  };
};
