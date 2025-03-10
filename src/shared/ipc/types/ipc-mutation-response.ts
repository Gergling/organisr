import { IPCBaseResponse } from "./ipc-base-response";

export type IPCMutationResponse = IPCBaseResponse & {
  data?: true;
};
