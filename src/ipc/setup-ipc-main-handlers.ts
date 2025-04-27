import { ipcMain } from "electron";
import { Database } from "sqlite3";
import { ipcChannelConfigs } from "./ipc-channel-configs";

export const setupIPCMainHandlers = (database: Database) => {
  ipcChannelConfigs.forEach(({ channelName, setupMainHandler }) => {
    ipcMain.handle(channelName, setupMainHandler({ database }));
  });
};
