import { TableConfigFieldProps } from "./table-config-field";

export type TableSchemaFieldProps = Required<TableConfigFieldProps> & {
  fieldName: string;
};
