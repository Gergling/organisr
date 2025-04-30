export const getJoinStatement = (
  localTableName: string,
  localFieldName: string,
  foreignTableName: string,
  foreignTableFieldName: string,
) => `
  LEFT JOIN ${foreignTableName}
  ON ${localTableName}.${localFieldName} = ${foreignTableName}.${foreignTableFieldName}
`;
