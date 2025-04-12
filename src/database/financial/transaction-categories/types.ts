import { TableConfigProps } from "../../shared";

type BaseModelPrimaryKey = {
  id: number;
}

type BaseModelData = {
  name: string;
  parent_id?: number;
  forInsertion: boolean;
}

export type FinancialTransactionCategoriesModelProps = BaseModelData
  & BaseModelPrimaryKey
  & { forInsertion: false };

export type FinancialTransactionCategoriesModelInsertionProps = BaseModelData
  & Partial<BaseModelPrimaryKey>
  & { forInsertion: true };

export type FinancialTransactionCategoriesTableConfigProps = TableConfigProps<
  FinancialTransactionCategoriesModelProps
>;
