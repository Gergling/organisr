import { IpcMainInvokeEvent } from "electron";
import { Database } from "sqlite3";
import { IPCRendererExposedProps } from "../../shared/ipc";

type IPCMainHandler = (event: IpcMainInvokeEvent, ...handlerArgs: unknown[]) => Promise<unknown>;
type SetupProps = {
  database: Database;
};

export type IPCChannelConfigProps = {
  channelName: string;
  invocationName: keyof IPCRendererExposedProps;
  setupMainHandler: (props: SetupProps) => IPCMainHandler;
};
