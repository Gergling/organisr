import { DatabaseModel } from "../../shared";

export type FinancialTransactionModelProps = {
  account_temporary: string;
  date: string;
  description: string;
  id?: number;
  meta: string;
  net: number;
}
// Do I even need this anymore?
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FinancialTransactionModel extends FinancialTransactionModelProps {}
export class FinancialTransactionModel extends DatabaseModel {
  set(props: FinancialTransactionModel) {
    return Object.assign(this, props);
  }
}
