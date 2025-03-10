import { Temporal } from "@js-temporal/polyfill";
import { GeneralAccountTransaction } from "../../../shared/transaction";

export const mockTransaction: GeneralAccountTransaction = {
  date: Temporal.PlainDate.from('2025-02-24'),
  description: 'Mock transaction',
  meta: {},
  net: 0,
};
