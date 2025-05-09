import { TableConfigForeignKeyBaseProps, TableSchemaFieldProps, TableSchemaProps } from "./types";

const getFieldsSQL = (
  fields: TableSchemaFieldProps[],
  foreignKeys: TableConfigForeignKeyBaseProps[],
) => {
  const fieldDefsSQL: string[] = [];
  const primaryKeySQL: string[] = [];
  const foreignKeySQL: string[] = [];
  fields.forEach(({
    fieldName,
    nullable,
    primaryKey,
    type,
  }) => {
    const nullSQLDef = (nullable ? '' : 'NOT ') + 'NULL';
    fieldDefsSQL.push(`${fieldName} ${type} ${nullSQLDef}`);
    if (primaryKey) {
      primaryKeySQL.push(`${fieldName}`);
    }
  });

  foreignKeys.forEach(({
    foreignTable,
    foreignTableKeyFieldName,
    localFieldName,  
  }) => {
    // TODO: May need to make the SET NULL more flexible at some point.
    foreignKeySQL.push(`
      FOREIGN KEY (${localFieldName})
      REFERENCES ${foreignTable} (${foreignTableKeyFieldName})
      ON DELETE SET NULL
    `);
  });

  return {
    fieldDefsSQL,
    foreignKeySQL,
    primaryKeySQL,
  };
}

export const getCreateSQL = ({
  fields,
  foreignKeys,
  name,
}: TableSchemaProps) => {
  const {
    fieldDefsSQL,
    foreignKeySQL,
    primaryKeySQL,
  } = getFieldsSQL(fields, foreignKeys);
  const createQuery = `CREATE TABLE IF NOT EXISTS ${name} (
    ${[
      ...fieldDefsSQL,
      (primaryKeySQL.length === 0 ? '' : `PRIMARY KEY (${primaryKeySQL.join(', ')})`),
      ...foreignKeySQL,
    ].join(', ')}
  )`;

  return createQuery;
};
