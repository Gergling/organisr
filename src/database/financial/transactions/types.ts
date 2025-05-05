type PrimaryKeyProps = {
  id: number;
};

export type FinancialTransactionModelValueProps = {
  account_temporary: string;
  account_id: number | null;
  category_id: number | null;
  date: string;
  description: string;
  meta: string;
  net: number;
};

// TODO: Ideally I would ensure the config nullables match the type nullables, but it can wait.
export type FinancialTransactionModelForeignValueProps = {
  accountName: string | null;
  categoryName: string | null;
}

export type FinancialTransactionsModelProps = PrimaryKeyProps & FinancialTransactionModelValueProps;

export type FinancialTransactionModelFetchMappingProps = FinancialTransactionsModelProps & FinancialTransactionModelForeignValueProps;
