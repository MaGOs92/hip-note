import { ipcMessage } from './utils';

export const save = settings => ipcMessage({
  name: 'save_config',
  data: settings,
});

export const load = () => ipcMessage({
  name: 'load_config',
}).then(message => message.data);;
