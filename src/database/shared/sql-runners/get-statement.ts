import { Database, Statement } from "sqlite3";

type ExecutionCallback = (error: Error | null, ...args: unknown[]) => void;
type HandlerFactory = <ResponseType>(props: {
  executionCallback: ExecutionCallback;
  resolve: (value: ResponseType | PromiseLike<ResponseType>) => void;
  statement: Statement;
}) => unknown;

export const getStatement = <ResponseType>(
  prefix: string,
  database: Database,
  sql: string,
  params: unknown,
  handlerFactory: HandlerFactory,
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
