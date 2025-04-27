import { TableConfigForeignKeyBaseProps } from "./types/table-config-foreign-key-base";

export const getReferenceSchema = <
  TableConfigForeignKeyProps extends TableConfigForeignKeyBaseProps
>({
  foreignTable,
  foreignTableKeyFieldName,
  foreignTableSelectFieldNames,
  localFieldName
}: TableConfigForeignKeyProps): TableConfigForeignKeyBaseProps => ({
  foreignTable,
  foreignTableKeyFieldName,
  foreignTableSelectFieldNames,
  localFieldName,
});
