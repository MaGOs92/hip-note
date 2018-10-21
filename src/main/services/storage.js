import fs from 'fs-extra';
import path from 'path';
import * as config from '../config.json';

export default class {
  constructor(appDataPath) {
    this.appDataPath = path.join(appDataPath, config.root_folder);
  }

  async writeJson({ file, folder, data }) {
    try {
      await fs.ensureDir(path.join(this.appDataPath, folder));
      return fs.writeJson(path.join(this.appDataPath, folder, file), data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async readJson({ file, folder }) {
    try {
      await fs.ensureDir(path.join(this.appDataPath, folder));
      return fs.readJson(path.join(this.appDataPath, folder, file));  
    }
    catch (err) {
      return Promise.reject(err);
    }
  }

  async readFolder({ folder }) {
    try {
      await fs.ensureDir(path.join(this.appDataPath, folder));
      return fs.readdir(path.join(this.appDataPath, folder));
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
}
