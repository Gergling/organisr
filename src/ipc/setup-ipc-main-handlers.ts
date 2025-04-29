import { ipcMain } from "electron";
import { Database } from "sqlite3";
import { ipcChannelConfigs } from "./ipc-channel-configs";

export const setupIPCMainHandlers = (database: Database) => {
  Object.entries(ipcChannelConfigs).forEach(([ channelName, setupMainHandler ]) => {
    console.log(`Setting up IPC channel handler for ${channelName}.`);
    ipcMain.handle(channelName, setupMainHandler({ database }));
  });
};
