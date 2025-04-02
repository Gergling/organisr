import { getConfigDef } from "./get-config-def";
import {
  TableConfigBaseProps,
  TableConfigForeignKeyBaseProps,
  TableSchemaFieldProps,
  TableSchemaProps
} from "./types";

export const getSchemas = (configs: TableConfigBaseProps[]): TableSchemaProps[] => {
  const schemas: TableSchemaProps[] = [];
  const tableNames = configs.map(({ name }) => name);

  configs.forEach(({ fields, foreignKeys, name }) => {
    const schemaFields: TableSchemaFieldProps[] = Object
      .entries(fields)
      .map(([fieldName, fieldDefinition]) => {
        const configDef = getConfigDef(fieldDefinition);
        const schemaDef: TableSchemaFieldProps = {
          fieldName,
          index: false,
          nullable: false,
          primaryKey: false,
          unique: false,
          ...configDef,
        };
        return schemaDef;
      });

    const schemaForeignKeys: TableConfigForeignKeyBaseProps[] = [];

    // Validate references against available tables.
    // Throw if they don't exist.
    if (foreignKeys) {
      foreignKeys.forEach(({ foreignTable, ...fieldNames }) => {

        if (!tableNames.find((tableName) => tableName === foreignTable)) {
          throw new Error(`getSchemas(): Config for table ${name} references a table named ${foreignTable} which cannot be found.`);
        }

        schemaForeignKeys.push({
          ...fieldNames,
          foreignTable,
        });
      });
    }

    schemas.push({
      name,
      fields: schemaFields,
      foreignKeys: schemaForeignKeys,
    })
  });

  return schemas;
};
