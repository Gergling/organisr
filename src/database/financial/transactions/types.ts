export type FinancialTransactionsModelProps = {
  account_temporary: string;
  category_id?: number;
  date: string;
  description: string;
  id?: number;
  meta: string;
  net: number;
};

export type FinancialTransactionModelFetchMappingProps = FinancialTransactionsModelProps & {
  categoryName: string;
};
