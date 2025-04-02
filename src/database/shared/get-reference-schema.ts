import { TableConfigForeignKeyBaseProps } from "./types/table-config-foreign-key-base";

export const getReferenceSchema = <
  TableConfigForeignKeyProps extends TableConfigForeignKeyBaseProps
>({ foreignTable, foreignTableFieldName, localFieldName }: TableConfigForeignKeyProps): TableConfigForeignKeyBaseProps => ({
  foreignTable,
  foreignTableFieldName,
  localFieldName,
});
