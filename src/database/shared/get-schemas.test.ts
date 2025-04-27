import { getSchemas } from "./get-schemas";
import { TableConfigProps, TableSchemaProps } from "./types";

const name = 'the_table';

const tableConfig: TableConfigProps<{
  id?: number;
  name: string;
  related_id?: number;
  tag: string;
}> = {
  fields: {
    id: {
      type: 'INTEGER',
      primaryKey: true,
    },
    name: 'TEXT',
    related_id: {
      nullable: true,
      type: 'INTEGER',
      index: true,
    },
    tag: {
      index: true,
      type: 'TEXT',
    },
  },
  foreignKeys: [
    {
      localFieldName: 'parent_id',
      foreignTable: name,
      foreignTableFieldName: 'id',
    }
  ],
  name,
};


describe('getSchemas', () => {
  it('should get a schema object out of a config object', () => {
    const schema: TableSchemaProps = {
      fields: [
        {
          fieldName: 'id',
          index: false,
          nullable: false,
          primaryKey: true,
          type: 'INTEGER',
          unique: false,
        },
        {
          fieldName: 'name',
          index: false,
          nullable: false,
          primaryKey: false,
          type: 'TEXT',
          unique: false,
        },
        {
          fieldName: 'related_id',
          index: true,
          nullable: true,
          primaryKey: false,
          type: 'INTEGER',
          unique: false,
        },
        {
          fieldName: 'tag',
          index: true,
          nullable: false,
          primaryKey: false,
          type: 'TEXT',
          unique: false,
        },
      ],
      foreignKeys: [
        {
          localFieldName: 'parent_id',
          foreignTable: name,
          foreignTableFieldName: 'id',
        }
      ],
      name,    
    };
    const schemas = getSchemas([tableConfig]);
    expect(schemas).toStrictEqual([schema]);
  });

  it('should throw if a config attempts to reference a table or field that does not exist', () => {
    const tableA: TableConfigProps<{
      id?: number;
    }> = {
      fields: {
        id: {
          type: 'INTEGER',
          primaryKey: true,
        },
      },
      name: 'table_A',
    };
    const tableB: TableConfigProps<{
      id?: number;
      foreign_id: number;
    }> = {
      fields: {
        id: {
          type: 'INTEGER',
          primaryKey: true,
        },
        foreign_id: 'INTEGER',
      },
      foreignKeys: [
        {
          localFieldName: 'foreign_id',
          foreignTable: 'table_A',
          foreignTableFieldName: 'id',
        }
      ],
      name: 'table_B',
    };
    const shouldNotThrow = () => getSchemas([
      tableA,
      tableB,
    ]);
    const shouldThrow = () => getSchemas([
      tableB,
    ]);
    expect(shouldNotThrow).not.toThrow('getSchemas(): Config for table table_B references a table named table_A which cannot be found.');
    expect(shouldThrow).toThrow('getSchemas(): Config for table table_B references a table named table_A which cannot be found.');
  });
});
