import { DatabaseFieldDefinitionProps } from "./table-config-field-definition";

export type TableConfigFieldProps = {
  type: DatabaseFieldDefinitionProps;
  nullable?: boolean;
  primaryKey?: boolean;
  index?: boolean;
  unique?: boolean;
};
