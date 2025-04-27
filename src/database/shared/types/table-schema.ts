import { TableConfigBaseProps } from "./table-config-base";
import { TableSchemaFieldProps } from "./table-schema-field";

export type TableSchemaProps = Required<Omit<TableConfigBaseProps, 'fields'>> & {
  fields: TableSchemaFieldProps[];
};
