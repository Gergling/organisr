import { useContext } from "react";
import { PreloadIPCContext } from "./PreloadIPCContext"
import { IPC_EXPOSURE_PROPERTY_NAME } from "../../../ipc/ipc-constants";

export const usePreloadIPC = () => {
  const context = useContext(PreloadIPCContext);
  const ipc = context[IPC_EXPOSURE_PROPERTY_NAME];
  return ipc;
}
