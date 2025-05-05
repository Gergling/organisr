import { getUpdateFactory } from "../../shared/sql-factory/get-update-factory";
import { financialAccountsDatabaseTableConfig } from "./config";
import { FinancialAccountsModelProps } from "./types";

export const updateFinancialAccount = getUpdateFactory<
  FinancialAccountsModelProps
>(financialAccountsDatabaseTableConfig);
