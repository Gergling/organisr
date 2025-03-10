import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { getDatabaseInstance } from './database';
import { setupIPCMainHandlers } from './ipc/setup-ipc-main-handlers';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

const dbPath = path.join(app.getPath('userData'), 'organiserdb.sqlite3');

const databaseWrapper = getDatabaseInstance(dbPath);

// Start the setup.

databaseWrapper.init().then(() => {
  console.log('Database initiated at', databaseWrapper.path)
  databaseWrapper
    .runSetupQueries()
    .then(() => {
      console.log('Setup queries done.')
    })
    .catch((error) => {
      console.error('Database setup error');
      console.error(error);
    });
}).catch((err) => console.error('Database opening error: ', err));

setupIPCMainHandlers(databaseWrapper.database);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  ipcMain.removeAllListeners();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
