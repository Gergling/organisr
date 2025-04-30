export type DataRecord<Model> = {
  local: Model;
  joins: {
    table: string;
    fieldValues: {
      [fieldName: string]: string;
    };
  }[];
};
