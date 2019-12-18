import { ipcMessage } from './utils';
import { ipcRenderer } from 'electron';
import VueRouter from '../router'

export const save = settings => ipcMessage({
  name: 'save_config',
  data: settings,
});

export const load = () => ipcMessage({
  name: 'load_config',
}).then(message => message.data);;


ipcRenderer.on('open_config', () => VueRouter.push('/settings'))