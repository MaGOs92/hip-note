import { ipcMessage } from './utils';

export const saveTag = tag => ipcMessage({
  name: 'saveTag',
  data: tag,
});

export const getTags = () => ipcMessage({
  name: 'getTags'
}).then(message => message.data);
