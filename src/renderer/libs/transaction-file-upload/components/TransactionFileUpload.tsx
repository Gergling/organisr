import { parse } from "papaparse";
import { useEffect, useState } from "react";
import { usePreloadIPC } from "../../../shared/preload-ipc-context/use-preload-ipc";
import { FinancialTransactionsModelProps } from "../../../../database/financial/transactions";

type CSVProps = {
  [columnName: string]: string;
};

type UploadModel = Omit<FinancialTransactionsModelProps, 'id'>;

const getTransactionFromHalifaxCurrent = (
  csvTransaction: CSVProps,
): UploadModel => {
  // TODO: Ultimately will want to loop a "checklist" of signature headers for the
  // CSV before we get to this function so we can confirm the data maps properly.
  // There is a github issue somewhere for this.
  const account_temporary = csvTransaction['Account Number'];
  const [day, month, year] = csvTransaction['Transaction Date'].split('/');
  const date = [year, month, day].join('-');
  const credit = +csvTransaction['Credit Amount'];
  const debit = +csvTransaction['Debit Amount'];
  const net = credit - debit;
  const meta = [
    'Balance',
    'Credit Amount',
    'Debit Amount',
    // 'Sort Code',
    'Transaction Type',
  ].map((fieldName) => `${fieldName}:${csvTransaction[fieldName]}`).join(',')

  const transaction: UploadModel = {
    account_id: null,
    account_temporary, // TODO: Ensure security is good.
    category_id: null,
    date,
    description: csvTransaction['Transaction Description'],
    meta,
    net,
  };

  return transaction;
};

export const TransactionFileUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const {
    addFinancialTransactions,
    fetchFinancialTransactions,
  } = usePreloadIPC();

  const handlePickFiles = (e: React.SyntheticEvent) => {
    const { files } = (e.target as HTMLInputElement);
    setFiles(files);
  };

  useEffect(() => {
    fetchFinancialTransactions().then((response) => console.log('newly fetched transactions', response)).catch(console.error);
  }, []);

  useEffect(() => {
    fetchFinancialTransactions().then((response) => console.log('...eventually fetched transactions', response)).catch(console.error);
  }, [files]);

  useEffect(() => {
    if (files) {
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
            const transactions = results.data.map(getTransactionFromHalifaxCurrent);
            addFinancialTransactions(transactions).then(() => {
              console.log('done? I guess...')
            }).catch(console.error).finally(() => {
              console.log('transactions finally')
              setFiles(null);
            });
          },
          header: true,
          skipEmptyLines: true,
        });
      }
    }
  }, [files]);
  return (
    <>
      <div>
        <input
          type="file"
          onChange={handlePickFiles}
        />
      </div>
      <div>When the file is populated and before upload, choose an account to associate.</div>
      <div>Transaction list from the database.</div>
    </>
  );
};
