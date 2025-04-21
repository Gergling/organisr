import { Database } from "sqlite3";
import { TableConfigProps } from "./types";
import { getTableConfigFieldNames } from "./get-fields";

type ForeignFieldSelectMapping = {
  alias: string;
  field: string;
};

type ForeignTableSelectMapping = {
  fields: ForeignFieldSelectMapping[];
  table: string;
}

const getForeignValueSQLComponents = <Model>(
  { name: localTableName, foreignKeys }: TableConfigProps<Model>
) => {
  const foreignValueFieldNames: string[] = [];
  const leftJoins: string[] = [];
  const foreignValueTableMappings: ForeignTableSelectMapping[] = [];

  if (foreignKeys) {
    foreignKeys.forEach(({ foreignTable, foreignTableKeyFieldName, foreignTableSelectFieldNames, localFieldName }) => {
      if (foreignTableSelectFieldNames.length > 0) {
        const foreignValueTableMapping: ForeignTableSelectMapping = {
          fields: [],
          table: foreignTable,
        };
        foreignTableSelectFieldNames.forEach((fieldName) => {
          const alias = `${foreignTable}_${fieldName}`;
          foreignValueFieldNames.push(`${foreignTable}.${fieldName} as ${alias}`);
          foreignValueTableMapping.fields.push({
            alias,
            field: fieldName,
          });
        });
  
        leftJoins.push(`LEFT JOIN ${foreignTable} ON ${localTableName}.${localFieldName} = ${foreignTable}.${foreignTableKeyFieldName}`);
        foreignValueTableMappings.push(foreignValueTableMapping);
      }
    });
  }

  return {
    foreignValueFieldNames,
    foreignValueTableMappings,
    leftJoins,
  };
};

// TODO: Might be worth reevaluating this later.
// I've created a function presumably for getting SELECT statement SQL,
// but it also returns foreign value mappings, indicating I need to rethink
// how I've structured my functions.
const getSelectSQL = <Model>(
  tableConfig: TableConfigProps<Model>,
) => {
  const { name: localTableName, fields } = tableConfig;
  const { fieldNames, primaryKeys } = getTableConfigFieldNames<Model>(fields);
  const {
    foreignValueFieldNames,
    foreignValueTableMappings,
    leftJoins,
  } = getForeignValueSQLComponents(tableConfig);

  const selectSQL = [
    [
      ...primaryKeys,
      ...fieldNames,
    ].map((fieldName) => `${localTableName}.${fieldName.toString()}`),
    ...foreignValueFieldNames,
  ].join(', ');
  const leftJoinSQL = leftJoins.join(' ');

  const sql = [
    `SELECT ${selectSQL}`,
    `FROM ${localTableName}`,
    `${leftJoinSQL}`,
  ].join(' ');

  return {
    foreignValueTableMappings,
    sql,
  };
};

type FlatRow<Model> = { [fieldName: string]: string } & Model;

type DataRecord<Model> = {
  local: Model;
  joins: {
    table: string;
    fieldValues: {
      [fieldName: string]: string;
    };
  }[];
}

type MapRowFunction<Model, Mapping> = (row: DataRecord<Model>) => Mapping;

const getDataRecordFactory = <Model, Mapping>(
  foreignTables: ForeignTableSelectMapping[],
  mapRow: MapRowFunction<Model, Mapping>,
) => {
  type DR = DataRecord<Model>;
  return (
    row: FlatRow<Model>,
  ): Mapping => mapRow({
    local: row,
    joins: foreignTables.map(({ fields, table }) => {
      const initialFieldValues: DR['joins'][0]['fieldValues'] = {};
      return {
        fieldValues: fields.reduce((mapping, { alias, field }) => {
          mapping[field] = row[alias];
          return mapping;
        }, initialFieldValues),
        table,
      };
    }),
  });
}

export const getSelectFactory = <Model, Mapping>(
  tableConfig: TableConfigProps<Model>,
  mapRow: MapRowFunction<Model, Mapping>,
) => {
  // TODO: This will not work if a select query is required for the foreign table.
  const getStatementQuery = (data: Partial<Model>) => Object.keys(data)
    .map((fieldName) => `${tableConfig.name}.${fieldName} = ?`);

  const getStatementComponents = (whereCriteria?: Partial<Model>) => {
    if (whereCriteria) {
      const whereStatementQuery = getStatementQuery(whereCriteria).join(' AND ');
      const statementSQL = `${sql} WHERE ${whereStatementQuery}`;
      const preparedStatementValues = Object.values(whereCriteria);

      return { statementSQL, preparedStatementValues };
    }

    return { statementSQL: sql, preparedStatementValues: {} };
  };
  const {
    foreignValueTableMappings,
    sql,
  } = getSelectSQL<Model>(tableConfig);

  const getDataRecord = getDataRecordFactory<Model, Mapping>(
    foreignValueTableMappings,
    mapRow
  );

  return (
    database: Database,
    whereCriteria?: Partial<Model>,
  ) => new Promise<Mapping[]>((resolve, reject) => {
    // Run the select quyery as a prepared statement.
    // TODO: This menthod of handling statements needs change.
    const {
      preparedStatementValues,
      statementSQL,
    } = getStatementComponents(whereCriteria);
    const statement = database.prepare(statementSQL, (error) => {
      if (error) {
        console.error(error);
        reject({
          message: error.message,
          type: 'select-prepare-failed',
        });
      }
    });

    statement.all<FlatRow<Model>>(preparedStatementValues, (error, rows) => {
      if (error) {
        console.error(statementSQL, preparedStatementValues, error);
        reject({
          message: error.message,
          type: 'select-all-failed',
        });
      }

      resolve(rows.map(getDataRecord))
    });
  });  
};
