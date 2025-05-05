import { CSVProps, TransactionUploadModel } from "../types";

export const getTransactionMapFromHalifaxCurrent = (
  csvTransaction: CSVProps,
): TransactionUploadModel => {
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

  const transaction: TransactionUploadModel = {
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
