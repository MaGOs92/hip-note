import { mainWindow, storageService, configurationService } from '../index';
import { ipcMain } from 'electron';

const getTags = async () => {
  const folder = await configurationService.getDocumentSavePath();
  let tags = {};
  try {
    tags = await storageService.readJson({ folder, file: 'tags.json' });
  } catch (err) {
    console.log('Création du fichier des tags');
    await storageService.writeJson({ folder, file: 'tags.json', data: tags });
  } finally {
    return tags;
  }
};

const saveTag = async (tag) => {
  const folder = await configurationService.getDocumentSavePath();
  const tags = await getTags();
  tags[tag.id] = tag;

  await storageService.writeJson({
    file: 'tags.json',
    folder,
    data: tags,
  });

  return tag;
};

ipcMain.on('saveTag', (event, message) => {
  return saveTag(message.data)
    .then((tag) => {
      mainWindow.webContents.send('saveTag', { id: message.id, data: tag });
    })
    .catch((err) => {
      console.error(err);
    });
});

ipcMain.on('getTags', (event, message) => {
  return getTags()
    .then((tags) => {
      mainWindow.webContents.send('getTags', {
        id: message.id,
        data: tags,
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
