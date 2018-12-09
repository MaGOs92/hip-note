import { ipcMessage } from './utils';

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
