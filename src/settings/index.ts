import * as fs from 'fs';

export const Settings = {
  
  get (key: string, filename: string | undefined) {
    if (!filename) {
      filename = 'settings.json';
    }
    let settings = null
    if (fs.existsSync(process.cwd() + "/default/" + filename)) {
      settings = require(process.cwd() + `/default/${filename}`);
    } else {
      return null
    }
    
    return settings[key];
  }

}