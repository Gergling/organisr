import { Database } from "sqlite3";
import { TableConfigProps } from "./types";
import { getTableConfigFieldNames } from "./get-fields";

export const getSelectFactory = <Model>(
  { name, fields }: TableConfigProps<Model>,
) => {
  const { fieldNames, primaryKeys } = getTableConfigFieldNames<Model>(fields);
  return (
    database: Database,
  ) => {
    const fieldNamesSQL = [...primaryKeys, ...fieldNames].join(', ');
    return new Promise<Model[]>((resolve, reject) => {
      database.all<Model>(
        `SELECT ${fieldNamesSQL} FROM ${name}`,
        (error, rows) => {
          if (error) {
            reject(error);
          }
  
          resolve(rows);
        },
      );
    });  
  };
};
