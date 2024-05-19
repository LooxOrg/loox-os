import * as fs from 'fs';

export const Settings = {
  
  get (key: string, filename: string | undefined) {
    if (!filename) {
      filename = 'settings.json';
    }
    let settingPath = process.cwd() + `/default/settings/system/${filename}`;
    let settings = null
    if (fs.existsSync(settingPath)) {
      settings = require(settingPath);
    } else {
      return null
    }
    return settings[key];
  }

}