import { getConfigDef } from "./get-config-def";
import { TableConfigFieldUnionProps, TableConfigProps } from "./types";

export const getTableConfigFields = <Model>(
  fields: TableConfigProps<Model>['fields'],
  omitPrimaryKey: boolean,
) => {
  const fieldNames: (keyof Model)[] = [];
  
  Object
    .entries<TableConfigFieldUnionProps>(fields)
    .forEach(([fieldName, fieldDefinition]) => {
      const { primaryKey } = getConfigDef(fieldDefinition);
      if (!primaryKey || !omitPrimaryKey) {
        fieldNames.push(fieldName as keyof Model);
      }
    });

  return fieldNames;
};

export const getTableConfigFieldNames = <Model>(
  fields: TableConfigProps<Model>['fields']
) => {
  type FieldNames = (keyof Model)[];

  const fieldNames: FieldNames = [];
  const primaryKeys: FieldNames = [];
  
  Object
    .entries<TableConfigFieldUnionProps>(fields)
    .forEach(([fieldNameStr, fieldDefinition]) => {
      const fieldName = fieldNameStr as keyof Model;
      const { primaryKey } = getConfigDef(fieldDefinition);
      if (primaryKey) {
        primaryKeys.push(fieldName);
      } else {
        fieldNames.push(fieldName);
      }
    });

  return {
    fieldNames,
    primaryKeys,
  };
};
