import { dialog } from 'electron';
import { mainWindow } from '../index';
import fs from 'fs-extra';

const getPdfPath = fileName => {
  return new Promise((resolve, reject) => {
    dialog.showSaveDialog(mainWindow, {
      title: 'Export du PDF',
      defaultPath: fileName
    }, filename => resolve(filename))
  });
};

const HTMLToPDFBuffer = options => {
  return new Promise((resolve, reject) => {
    mainWindow.webContents.printToPDF(options, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

export const printPDF = async document => {
  const fileName = document.title + '.pdf';
  const pdfPath = await getPdfPath(fileName);
  const buffer = await HTMLToPDFBuffer({
    printBackground: true,
    marginsType: 1,
    pageSize: 'A4'
  });
  await fs.writeFile(pdfPath, buffer);
  return pdfPath;
};
