export default class Settings {

  constructor() {}

  get(key: string, filename: string) {
    if (!filename) {
      filename = 'settings.json';
    }

    let settings = require(`../../default/${filename}`);

    return settings[key];
  }

}