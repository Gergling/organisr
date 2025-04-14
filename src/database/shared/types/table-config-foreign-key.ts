import { TableConfigForeignKeyBaseProps } from "./table-config-foreign-key-base";

export type TableConfigForeignKeyProps<
  Model,
  ForeignTableModel
> = TableConfigForeignKeyBaseProps & {
  foreignTable: string;
  foreignTableKeyFieldName: keyof ForeignTableModel;
  foreignTableSelectFieldNames: (keyof ForeignTableModel)[];
  localFieldName: keyof Model;
};
