import { IpcMainInvokeEvent } from "electron";
import { IPCRendererExposedProps } from "../../shared/ipc";

type IPCMainHandler = (event: IpcMainInvokeEvent, ...handlerArgs: unknown[]) => Promise<unknown>;

export type IPCChannelConfigProps = {
  channelName: string;
  invocationName: keyof IPCRendererExposedProps;
  setupMainHandler: (...setupArgs: unknown[]) => IPCMainHandler;
};
