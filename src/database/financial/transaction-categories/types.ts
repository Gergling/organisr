import { TableConfigProps } from "../../shared";

type BaseModelPrimaryKey = {
  id: number;
}

type BaseModelData = {
  name: string;
  parent_id?: number;
}

type BaseModel = BaseModelData & BaseModelPrimaryKey;

export type FinancialTransactionCategoriesModelProps = BaseModel;

export type FinancialTransactionCategoriesModelInsertionProps = BaseModelData
  & Partial<BaseModelPrimaryKey>;

export type FinancialTransactionCategoriesTableConfigProps = TableConfigProps<
  BaseModel
>;
