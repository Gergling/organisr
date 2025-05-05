import { TableConfigProps } from "../../shared";

export type FinancialAccountsModelProps = {
  id: number;
  name: string;
};

export type FinancialAccountsFetchProps = FinancialAccountsModelProps & {
  count_transactions: number;
};

export type FinancialAccountsTableConfigProps = TableConfigProps<FinancialAccountsModelProps>;
