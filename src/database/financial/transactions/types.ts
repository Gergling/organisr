type PrimaryKeyProps = {
  id: number;
};

type ValueProps = {
  account_temporary: string;
  category_id: number | null;
  date: string;
  description: string;
  meta: string;
  net: number;
};

// TODO: Ideally I would ensure the config nullables match the type nullables, but it can wait.
type ForeignValueProps = {
  categoryName: string | null;
}

export type FinancialTransactionsModelProps = PrimaryKeyProps & ValueProps;

export type FinancialTransactionModelInsertionProps = Partial<PrimaryKeyProps> & ValueProps;

export type FinancialTransactionModelFetchMappingProps = FinancialTransactionsModelProps & ForeignValueProps;
