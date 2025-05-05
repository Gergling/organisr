import { getInsertFactory } from "../../shared";
import { financialAccountsDatabaseTableConfig } from "./config";
import { FinancialAccountsModelProps } from "./types";

export const insertFinancialAccounts = getInsertFactory<
  FinancialAccountsModelProps,
  'id'
>(financialAccountsDatabaseTableConfig);
