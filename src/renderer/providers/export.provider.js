import { ipcRenderer } from 'electron';

export const exportToPDF = document => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('exportToPDF', document);
    ipcRenderer.on('exportToPDF', (event, data) => {
      data.success ? resolve() : reject();
    });
  })
}
