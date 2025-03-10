import { ipcMain } from "electron";
import { FinancialTransactionCollection } from "../database/financial/transactions";
import { Database } from "sqlite3";
import { ipcChannelConfigs } from "./ipc-channel-configs";

export const setupIPCMainHandlers = (database: Database) => {
  ipcChannelConfigs.forEach(({ channelName, setupMainHandler }) => {
    ipcMain.handle(channelName, setupMainHandler(database));
  });

  // ipcMain.handle('ipc-test', (_, arg) => new Promise<string>((resolve) => {
  //   console.log('handling ipc test')
  //   resolve('main ipc test handled: ' + arg)
  // }));
  
  // ipcMain.handle(
  //   'financial-transactions-add',
  //   (_, transactions) => FinancialTransactionCollection.insert(database, transactions)
  // );

  // ipcMain.handle(
  //   'financial-transactions-get',
  //   () => FinancialTransactionCollection.select(database),
  // );
}
