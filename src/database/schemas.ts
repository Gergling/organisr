import { financialTransactionCategoriesDatabaseTableConfig } from "./financial";
import { financialTransactionsDatabaseTableConfig } from "./financial/transactions/config";
import { getSchemas } from "./shared/get-schemas";

export const schemas = getSchemas([
  financialTransactionCategoriesDatabaseTableConfig,
  financialTransactionsDatabaseTableConfig,
]);
