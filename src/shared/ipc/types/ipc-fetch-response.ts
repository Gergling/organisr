import { IPCBaseResponse } from "./ipc-base-response";

export type IPCFetchResponse<DataType> = IPCBaseResponse & {
  data?: DataType[];
};
