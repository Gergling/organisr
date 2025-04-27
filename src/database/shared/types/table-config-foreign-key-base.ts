export type TableConfigForeignKeyBaseProps = {
  foreignTable: string;
  foreignTableKeyFieldName: string;
  foreignTableSelectFieldNames: string[];
  localFieldName: string;
};
