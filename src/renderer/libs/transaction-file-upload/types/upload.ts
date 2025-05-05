import { FinancialTransactionsModelProps } from "../../../../database/financial";

export type TransactionUploadModel = Omit<FinancialTransactionsModelProps, 'id'>;
