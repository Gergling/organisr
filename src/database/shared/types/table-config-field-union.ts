import { TableConfigFieldProps } from "./table-config-field";
import { DatabaseFieldDefinitionProps } from "./table-config-field-definition";

export type TableConfigFieldUnionProps =
  TableConfigFieldProps | DatabaseFieldDefinitionProps;
