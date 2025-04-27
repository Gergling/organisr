import { TableConfigFieldUnionProps } from "./table-config-field-union";
import { TableConfigForeignKeyBaseProps } from "./table-config-foreign-key-base";

// TODO: Separate primary key field to make insertion factory types clearer.
export type TableConfigProps<Model> = {
  name: string;
  fields: {
    [fieldName in keyof Model]: TableConfigFieldUnionProps;
  },
  foreignKeys?: TableConfigForeignKeyBaseProps[],
};
