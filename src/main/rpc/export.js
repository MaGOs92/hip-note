import { ipcMain } from 'electron';
import { printPDF } from '../services/pdf';
import { mainWindow } from '../index';

ipcMain.on('exportToPDF', async (event, message) => {
  let pdfPath;
  try {
    pdfPath = await printPDF(message);
  } catch (error) {
    console.error('Erreur lors de la génération de PDF', err);
  } finally {
    const success = Boolean(pdfPath);
    mainWindow.webContents.send('exportToPDF', {
      success,
    });
  }
});
