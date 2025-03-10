import { DatabaseModel } from "../../shared";

export type FinancialTransactionModelProps = {
  date: string;
  description: string;
  id?: number;
  meta: string;
  net: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FinancialTransactionModel extends FinancialTransactionModelProps {}
export class FinancialTransactionModel extends DatabaseModel {
  set(props: FinancialTransactionModel) {
    return Object.assign(this, props);
  }
}
