import path from 'path';
import * as config from '../config.json';
import { loadSettings } from '../rpc/configuration';

export default class {
  constructor(appDataPath) {
    this.appDataPath = path.join(appDataPath, config.root_folder);
  }

  getDefaultDocumentSavePath() {
    return path.join(this.appDataPath, config.sub_folders.DOCUMENTS);
  }

  async getDocumentSavePath() {
    const userSettings = await loadSettings();
    return (
      (userSettings && userSettings.saveFolder) ||
      this.getDefaultDocumentSavePath()
    );
  }

  getConfigurationSavePath() {
    return path.join(this.appDataPath, config.sub_folders.CONFIGURATION);
  }
}
