import shortid from 'shortid';
import { ipcRenderer } from 'electron';

const ipcMessage = (message) => {
  message.id = shortid.generate();
  return new Promise((resolve, reject) => {
    ipcRenderer.send(message.name, message);
    ipcRenderer.on(message.name, (event, data) => {
      if (data.id === message.id) {
        resolve(data);
      }
    });
    setTimeout(() => {
      reject('Timeout error : ', message);
    }, 500);
  });
};

export const save = document => ipcMessage({
  name: 'save',
  data: document,
});

export const load = documentId => ipcMessage({
  name: 'load',
  data: documentId,
}).then(message => message.data);;

export const listAll = () => ipcMessage({
  name: 'listAll'
}).then(message => message.data);
