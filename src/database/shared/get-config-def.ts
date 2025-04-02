import { TableConfigFieldProps, TableConfigFieldUnionProps } from "./types";

export const getConfigDef = (
  fieldDefinition: TableConfigFieldUnionProps
): TableConfigFieldProps => typeof fieldDefinition === 'string'
  ? { type: fieldDefinition } : fieldDefinition;
