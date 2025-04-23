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

// TODO: Evaluate whether we really want this.
// If we clearly mark the primary key separately, we definitely don't.
export type FinancialTransactionCategoriesModelInsertionProps = BaseModelData
  & Partial<BaseModelPrimaryKey>;

export type FinancialTransactionCategoriesTableConfigProps = TableConfigProps<
  BaseModel
>;
