import { TableConfigFieldUnionProps } from "./table-config-field-union";
import { TableConfigForeignKeyBaseProps } from "./table-config-foreign-key-base";

export type TableConfigProps<Model> = {
  name: string;
  fields: {
    [fieldName in keyof Model]: TableConfigFieldUnionProps;
  },
  foreignKeys?: TableConfigForeignKeyBaseProps[],
};
