import { mainWindow, storageService, configurationService } from '../index';
import { ipcMain } from 'electron';
import * as config from '../config.json';
import * as defaultSettings from '../default-settings.json';

const saveSettings = settings => {
  const folder = configurationService.getConfigurationSavePath()
  console.log('save', settings, folder)
  return storageService.writeJson({
    file: config.user_conf_file,
    folder,
    data: settings
  })
};

export const loadSettings = () => {
  const folder = configurationService.getConfigurationSavePath()
  return storageService.readJson({
    file: config.user_conf_file,
    folder
  }).catch((err) => {
    console.log(`Création du fichier ${folder}/${config.user_conf_file}`)
    saveSettings(defaultSettings)
  });
};

ipcMain.on('save_config', (event, message) => {
  return saveSettings(message.data)
    .then(() => {
      mainWindow.webContents.send('save', {id: message.id})
    })
    .catch((err) => {
      console.error(err);
    });
});

ipcMain.on('load_config', (event, message) => {
  return loadSettings(message.data)
    .then((settings) => {
      mainWindow.webContents.send('load', {
        id: message.id,
        data: settings
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
