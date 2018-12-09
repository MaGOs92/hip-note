import shortid from 'shortid';
import { ipcRenderer } from 'electron';

export const ipcMessage = (message) => {
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