import { IpcRenderer } from "electron";
import { IPCRendererExposedProps } from "../shared/ipc/types/ipc-preload-props";
import { ipcChannelConfigs } from "./ipc-channel-configs";

export const setupIPCRendererInvocations = (ipcRenderer: IpcRenderer) => {
  return Object.entries(ipcChannelConfigs).reduce(
    (ipcRendererInvocations, [invocationName]) => {
      console.log(`Setting up IPC channel invocation for ${invocationName}`);
      return {
        ...ipcRendererInvocations,
        [invocationName]: (...args: unknown[]) =>
          ipcRenderer.invoke(invocationName, ...args),
      }
    },
    // TODO: I hate it.
    {} as IPCRendererExposedProps
  );
}
