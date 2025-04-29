import { getSelectFactory } from "../../shared";
import { financialAccountsDatabaseTableConfig } from "./config";
import { FinancialAccountsModelProps } from "./types";

type Model = FinancialAccountsModelProps;

export const selectFinancialAccounts = getSelectFactory<Model, Model>(
  financialAccountsDatabaseTableConfig,
  ({ local }) => ({ ...local }),
);
