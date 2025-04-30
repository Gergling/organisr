type PrimaryKeyProps = {
  id: number;
};

type ValueProps = {
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

export type FinancialTransactionsModelProps = PrimaryKeyProps & ValueProps;

// TODO: We don't actually use Partial<PrimaryKeyProps> right now. We don't need this. We never needed this.
export type FinancialTransactionModelInsertionProps = Partial<PrimaryKeyProps> & ValueProps;

export type FinancialTransactionModelFetchMappingProps = FinancialTransactionsModelProps & FinancialTransactionModelForeignValueProps;
