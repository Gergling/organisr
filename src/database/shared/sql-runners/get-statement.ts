import { Database, Statement } from "sqlite3";

type ExecutionCallback = (error: Error | null, ...args: unknown[]) => void;
type HandlerFactory<PromiseType> = (props: {
  executionCallback: ExecutionCallback;
  resolve: (value: PromiseType | PromiseLike<PromiseType>) => void;
  statement: Statement;
}) => unknown;

export const getStatement = <ResponseType>(
  prefix: string,
  database: Database,
  sql: string,
  params: unknown,
  handlerFactory: HandlerFactory<ResponseType>,
) => new Promise<ResponseType>((resolve, reject) => {
  const statement = database.prepare(sql, (error) => {
    if (error) {
      console.error(error);
      reject({
        message: error.message,
        type: `${prefix}-prepare-failed`,
      });
    }
  });

  const executionCallback: ExecutionCallback = (error) => {
    if (error) {
      console.error(sql, params, error);
      reject({
        message: error.message,
        type: `${prefix}-execution-failed`,
      });
    }
  }

  handlerFactory({ executionCallback, resolve, statement });
});
