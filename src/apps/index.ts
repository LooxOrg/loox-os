
import fs from 'fs';

let appsPaths = [
  'apps',
];

const Apps = {
  getAll() {
    let apps: any[] = [];
    appsPaths.forEach(path => {
      if (fs.existsSync(path)) {
        apps = apps.concat(fs.readdirSync(path));
      }
    });
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