import { mainWindow, storageService, configurationService } from '../index';
import { ipcMain } from 'electron';
import * as config from '../config.json';
import * as defaultSettings from '../default-settings.json';

export const openSettings = () => {
  mainWindow.webContents.send('open_config');
};

const saveSettings = (settings) => {
  const folder = configurationService.getConfigurationSavePath();
  console.log('save', settings, folder);
  return storageService.writeJson({
    file: config.user_conf_file,
    folder,
    data: settings,
  });
};

export const loadSettings = () => {
  const folder = configurationService.getConfigurationSavePath();
  return storageService
    .readJson({
      file: config.user_conf_file,
      folder,
    })
    .catch(async (err) => {
      console.log(`Création du fichier ${folder}/${config.user_conf_file}`);
      const settings = defaultSettings;
      settings.saveFolder = configurationService.getDefaultDocumentSavePath();
      await saveSettings(defaultSettings);
      return settings;
    })
    .then((newSettings) => newSettings)
    .catch((err) =>
      console.log(
        'Une erreur est survenue lors de la création du fichier de configuration'
      )
    );
};

ipcMain.on('save_config', (event, message) => {
  return saveSettings(message.data)
    .then(() => {
      mainWindow.webContents.send('save_config', { id: message.id });
    })
    .catch((err) => {
      console.error(err);
    });
});

ipcMain.on('load_config', (event, message) => {
  return loadSettings()
    .then((settings) => {
      mainWindow.webContents.send('load_config', {
        id: message.id,
        data: settings,
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
