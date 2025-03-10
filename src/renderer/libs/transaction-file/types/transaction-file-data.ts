import { WithRequired } from "@tanstack/react-query";
import { TransactionFileMeta } from "./transaction-file-meta";

export type TransactionFileData = WithRequired<TransactionFileMeta, 'data'>;
