import { Temporal } from "@js-temporal/polyfill";
import { GeneralAccountTransaction } from "../../../shared/transaction";

export const getSortedTransactions = (
  transactions: GeneralAccountTransaction[]
) => transactions.sort((a, b) => Temporal.PlainDate.compare(a.date, b.date));
