import {
  financialAccountsDatabaseTableConfig,
  financialTransactionCategoriesDatabaseTableConfig,
  financialTransactionsDatabaseTableConfig
} from "./financial";
import { getSchemas } from "./shared/get-schemas";

export const schemas = getSchemas([
  financialAccountsDatabaseTableConfig,
  financialTransactionCategoriesDatabaseTableConfig,
  financialTransactionsDatabaseTableConfig,
]);
