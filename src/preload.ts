// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { IPCRendererExposedProps } from "./shared/ipc/types/ipc-preload-props";
import { setupIPCRendererInvocations } from "./ipc/setup-ipc-renderer-invocations";
import { IPC_EXPOSURE_PROPERTY_NAME } from "./ipc/ipc-constants";

const ipc: IPCRendererExposedProps = setupIPCRendererInvocations(ipcRenderer);

contextBridge.exposeInMainWorld(IPC_EXPOSURE_PROPERTY_NAME, ipc);
