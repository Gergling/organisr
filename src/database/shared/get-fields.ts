import { getConfigDef } from "./get-config-def";
import { TableConfigFieldUnionProps, TableConfigProps } from "./types";

export const getTableConfigFields = <Model>(
  fields: TableConfigProps<Model>['fields'],
  forInsert: boolean,
) => {
  const fieldNames: (keyof Model)[] = [];
  
  Object
    .entries<TableConfigFieldUnionProps>(fields)
    .forEach(([fieldName, fieldDefinition]) => {
      const { primaryKey } = getConfigDef(fieldDefinition);
      if (!primaryKey || !forInsert) {
        fieldNames.push(fieldName as keyof Model);
      }
    });

  return fieldNames;
};
