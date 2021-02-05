import { mainWindow, storageService, configurationService } from '../index';
import { ipcMain } from 'electron';

const saveDocument = async document => {
  let oldDocument = {};
  try {
    oldDocument = await loadDocument(document.id);
  } catch (err) {
    console.log('Nouveau document : ' + document.id)
  }
  const documentToSave = {
    ...oldDocument,
    ...document
  };
  const folder = await configurationService.getDocumentSavePath()
  return storageService.writeJson({
    file: document.id + '.json',
    folder,
    data: documentToSave
  })
};

const loadDocument = async id => {
  const folder = await configurationService.getDocumentSavePath()
  return storageService.readJson({
    file: id + '.json',
    folder,
  });
};

const listAllDocuments = async () => {
  const folder = await configurationService.getDocumentSavePath()
  return storageService.readFolder({
    folder,
  })
  .then(allFiles => {
    return Promise.all(allFiles
      .filter(file => /[\w-]{9}\.json/.test(file))
      .map(file => storageService.readJson({
        file,
        folder,
    })))
  })
  .then(allDocuments => allDocuments.map(({id, title, created, lastModified, isFav, tags, deleted}) => {
    return {
      id,
      title,
      created,
      lastModified,
      isFav,
      tags,
      deleted
    };
  }));
};

ipcMain.on('save', (event, message) => {
  return saveDocument(message.data)
    .then(() => {
      mainWindow.webContents.send('save', {id: message.id})
    })
    .catch((err) => {
      console.error(err);
    });
});

ipcMain.on('load', (event, message) => {
  return loadDocument(message.data)
    .then((document) => {
      mainWindow.webContents.send('load', {
        id: message.id,
        data: document
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

ipcMain.on('listAll', (event, message) => {
  return listAllDocuments()
    .then((documents) => {
      mainWindow.webContents.send('listAll', {
        id: message.id,
        data: documents
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
