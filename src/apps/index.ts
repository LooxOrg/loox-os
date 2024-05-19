
import fs from 'fs';
import { Settings } from '../settings';


const Apps = {
  getAll() {
    let apps = Settings.get('apps', 'apps.json');
    
    return apps;
  },
  
  async get(id: string) {
    let filePath = process.cwd() + `/apps/${id}/manifest.json`;
    console.log(filePath);
    let appManifest = await fs.promises.readFile(filePath).then((manifest) => {
      
      return JSON.parse(manifest.toString());
    }).catch((err) => {
      return null;
    });
    return appManifest;
    
    
  },
  
  getManifest(id: string) {
  }

};

export default Apps;