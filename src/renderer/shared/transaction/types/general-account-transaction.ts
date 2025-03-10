import { Temporal } from "@js-temporal/polyfill";

export type GeneralAccountTransaction = {
  credit?: number;
  date: Temporal.PlainDate;
  debit?: number;
  description: string;
  meta: { [key: string]: string };
  net: number;
};
