import { IpcMainInvokeEvent } from "electron";
import { Database } from "sqlite3";
import { IPCRendererExposedProps } from "../../shared/ipc";

type SetupProps = {
  database: Database;
};

type IPCChannelConfigBaseFunction = (...args: unknown[]) => Promise<unknown>;

type IPCChannelSetupHandlerFunction<
  InvocationFunction extends IPCChannelConfigBaseFunction
> = (props: SetupProps) => (
  event: IpcMainInvokeEvent,
  ...handlerArgs: Parameters<InvocationFunction>
) => ReturnType<InvocationFunction>;

export type IPCCHannelConfigFactory = {
  [key in keyof IPCRendererExposedProps]: IPCChannelSetupHandlerFunction<IPCRendererExposedProps[key]>;
};
