import { getTableConfigFieldNames } from "../get-table-config-field-names";
import { TableConfigProps } from "../types";

export const getSelectStatement = <Model>(
  { fields, name: localTableName }: TableConfigProps<Model>,
  foreignValueFieldNames: string[],
) => {
  const { fieldNames, primaryKeys } = getTableConfigFieldNames<Model>(fields);
  return [
    [
      ...primaryKeys,
      ...fieldNames,
    ].map((fieldName) => `${localTableName}.${fieldName.toString()}`),
    ...foreignValueFieldNames,
  ].join(', ');
};
