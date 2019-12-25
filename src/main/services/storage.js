import fs from 'fs-extra';
import path from 'path';

export default class {

  async writeJson({ file, folder, data }) {
    console.log('folder', folder)
    try {
      await fs.ensureDir(folder);
      return fs.writeJson(path.join(folder, file), data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async readJson({ file, folder }) {
    try {
      await fs.ensureDir(folder);
      return fs.readJson(path.join(folder, file));  
    }
    catch (err) {
      return Promise.reject(err);
    }
  }

  async readFolder({ folder }) {
    try {
      await fs.ensureDir(folder);
      return fs.readdir(folder);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
}
