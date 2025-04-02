import { TableConfigFieldUnionProps } from "./table-config-field-union";
import { TableConfigForeignKeyBaseProps } from "./table-config-foreign-key-base";

export type TableConfigBaseProps = {
  name: string;
  fields: {
    [fieldName: string]: TableConfigFieldUnionProps;
  },
  foreignKeys?: TableConfigForeignKeyBaseProps[],
};
