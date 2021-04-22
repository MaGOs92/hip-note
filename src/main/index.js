import { app, BrowserWindow, Menu } from 'electron';
import menuTemplate from './menu';
import StorageService from './services/storage';
import ConfigurationService from './services/configuration';
import AppUpdateService from './services/app-update';
import './rpc/document';
import './rpc/export';
import './rpc/tag';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\'); // eslint-disable-line
}

let mainWindow;

const storageService = new StorageService();
const configurationService = new ConfigurationService(app.getPath('appData'));

export const rootURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      webSecurity: false,
    },
  });

  mainWindow.loadURL(rootURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') {
    new AppUpdateService();
  }
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

export { mainWindow, app, storageService, configurationService };
