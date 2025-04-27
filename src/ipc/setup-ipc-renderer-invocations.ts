import { IpcRenderer } from "electron";
import { IPCRendererExposedProps } from "../shared/ipc/types/ipc-preload-props";
import { ipcChannelConfigs } from "./ipc-channel-configs";

export const setupIPCRendererInvocations = (ipcRenderer: IpcRenderer) => {
  return ipcChannelConfigs.reduce(
    (ipcRendererInvocations, { channelName, invocationName }) => {
      return {
        ...ipcRendererInvocations,
        [invocationName]: (...args: unknown[]) =>
          ipcRenderer.invoke(channelName, ...args),
      }
    },
    // TODO: I hate it.
    {} as IPCRendererExposedProps
  );
}
