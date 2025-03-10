import { TransactionFileMeta } from "../../transaction-file";

export const getConvertedTransactionFiles = (
  files: gapi.client.drive.File[]
): TransactionFileMeta[] => files.map(({ id, name }) => ({ id: id || '', name: name || '' }));
