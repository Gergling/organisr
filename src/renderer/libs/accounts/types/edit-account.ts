import { FinancialAccountsModelProps } from "../../../../database/financial";

export type FinancialAccountsModelValueProps = Omit<FinancialAccountsModelProps, 'id'>;

export type EditAccountProps = {
  accountId?: number;
  initialName?: string;
  onCancel: () => void;
  onSave: (accountData: FinancialAccountsModelValueProps, accountId?: number) => void;
};
