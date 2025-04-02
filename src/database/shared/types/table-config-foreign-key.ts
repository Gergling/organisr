import { TableConfigForeignKeyBaseProps } from "./table-config-foreign-key-base";

export type TableConfigForeignKeyProps<
  Model,
  ForeignTableModel
> = TableConfigForeignKeyBaseProps & {
  foreignTable: string;
  foreignTableFieldName: keyof ForeignTableModel;
  localFieldName: keyof Model;
};
