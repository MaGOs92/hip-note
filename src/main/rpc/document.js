import { mainWindow, storage } from '../index';
import { ipcMain } from 'electron';
import * as config from '../config.json';


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
  return storage.writeJson({
    file: document.id + '.json',
    folder: config.sub_folders.DOCUMENTS,
    data: documentToSave
  })
};

const loadDocument = id => {
  return storage.readJson({
    file: id + '.json',
    folder: config.sub_folders.DOCUMENTS
  });
};

const listAllDocuments = () => {
  return storage.readFolder({
    folder: config.sub_folders.DOCUMENTS
  })
  .then(allFiles => {
    return Promise.all(allFiles.map(file => storage.readJson({
      file,
      folder: config.sub_folders.DOCUMENTS
    })))
  })
  .then(allDocuments => allDocuments.map(({id, title, created, lastModified, isFav, deleted}) => {
    return {
      id,
      title,
      created,
      lastModified,
      isFav,
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
