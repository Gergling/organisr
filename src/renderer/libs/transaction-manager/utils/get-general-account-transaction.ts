import { Temporal } from "@js-temporal/polyfill";
import {
  AnyTransactionType,
  BaseCSVTransaction,
  HalifaxCurrentAccountCSVTransaction,
  TransactionType
} from "../../transaction-file/types";
import { GeneralAccountTransaction } from "../../../shared/transaction";

type FunctionMapping<CSVTransactionType extends BaseCSVTransaction> = {
  [key in TransactionType]: (csvTransaction: CSVTransactionType) => GeneralAccountTransaction;
};

const getMeta = <CSVTransactionType extends Partial<AnyTransactionType>>(
  props: (keyof CSVTransactionType)[],
  transaction: CSVTransactionType
) => {
  const ret: Partial<CSVTransactionType> = {};
  props.forEach((key) => {
    ret[key] = transaction[key];
  });
  return ret;
}

/**
 * 
 * @param csvTransaction 
 * @deprecated Use [other function] instead.
 * @returns 
 */
const getTransactionFromHalifaxCurrent = (
  csvTransaction: HalifaxCurrentAccountCSVTransaction
): GeneralAccountTransaction => {
  const [day, month, year] = csvTransaction['Transaction Date'].split('/');
  const date = new Temporal.PlainDate(+year, +month, +day);
  const credit = +csvTransaction['Credit Amount'];
  const debit = +csvTransaction['Debit Amount'];
  const net = credit - debit;
  const transaction: GeneralAccountTransaction = {
    credit,
    date,
    debit,
    description: csvTransaction['Transaction Description'],
    meta: getMeta([
      'Account Number',
      'Balance',
      'Sort Code',
      'Transaction Type',
    ], csvTransaction),
    net,
  };
  return transaction;
};

export const getGeneralAccountTransaction = <CSVTransactionType extends AnyTransactionType>(
  csvTransaction: CSVTransactionType,
): GeneralAccountTransaction => {
  const availableFunctions = ({
    'halifax-current': getTransactionFromHalifaxCurrent,
  } as FunctionMapping<CSVTransactionType>);

  const chosenFunction = availableFunctions[csvTransaction.type];

  const transaction = chosenFunction(csvTransaction);

  return transaction;
};
