import { Database } from "sqlite3";
import { FinancialTransactionModel, FinancialTransactionModelProps } from "./financial-transaction-model";
import { DatabaseCollection } from "../../shared";

export class FinancialTransactionCollection extends DatabaseCollection<
  FinancialTransactionModel
> {
  insert(): Promise<void> {
    const fieldNames = FinancialTransactionCollection.getFieldNames(true);
    const preparedStatementQuery = this.models
      .map(() => `(${fieldNames.map(() => '?').join(', ')})`)
      .join(', ');
    const preparedStatementValues = this.models
      .reduce((values, transaction) => {
        // This ensures the values are in the same order as the fields.
        const transactionRowData = fieldNames
          .map((fieldName) => transaction[fieldName as keyof FinancialTransactionModel]);
        return [
          ...values,
          ...transactionRowData,
        ];
      }, []);
    const statementSQL = `
      INSERT INTO transactions (${fieldNames.join(', ')})
      VALUES ${preparedStatementQuery}
    `;
    const statement = this.database.prepare(statementSQL);
    return new Promise<void>((resolve, reject) => {
      statement.run(preparedStatementValues, (error) => {
        if (error) {
          console.error(error);
          reject({
            message: error.message,
            type: 'insert-statement-failed',
          });
        }

        resolve();
      });
    });
  }

  static getFieldNames(forInsert: boolean) {
    const fieldNames: (keyof FinancialTransactionModel)[] = [
      'account_temporary',
      'date',
      'description',
      'meta',
      'net',
    ];
    if (!forInsert) {
      fieldNames.push('id');
    }
    return fieldNames;
  }

  static insert(database: Database, transactions: FinancialTransactionModel[]) {
    const collection = new FinancialTransactionCollection(database);
    collection.set(transactions);
    return new Promise<void>((resolve, reject) => {
      if (collection.isEmpty()) {
        reject({
          message: 'There are no transactions in this request... what did you think this would do?',
          type: 'no-transactions',
        });
      }

      collection.insert().then(() => {
        resolve();
      }).catch((error) => {
        console.error(error);
        reject(error);
      });
    });
  }

  static select(database: Database) {
    const fieldNames = FinancialTransactionCollection.getFieldNames(false);
    const fieldNamesSQL = fieldNames.join(', ');
    return new Promise<FinancialTransactionModelProps[]>((resolve, reject) => {
      database.all<FinancialTransactionModelProps>(
        `SELECT ${fieldNamesSQL} FROM transactions`,
        (error, rows) => {
          if (error) {
            reject(error);
          }
  
          resolve(rows);
        },
      );
    });
  }
}
