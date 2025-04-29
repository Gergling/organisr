import { TableConfigProps } from "../../shared";

export type FinancialAccountsModelProps = {
  id: number;
  name: string;
};

export type FinancialAccountsTableConfigProps = TableConfigProps<FinancialAccountsModelProps>;
