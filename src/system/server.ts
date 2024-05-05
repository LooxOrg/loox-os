
import { IncomingMessage, ServerResponse, createServer } from "http";
import Settings from "../settings";
import { existsSync, readFile, readFileSync } from "fs";

export default class Server {
  apps: {};
  constructor() {
    this.apps = {};

    
  }
  init() {
    createServer(this.handleRequest).listen(8081);
  }

  handleRequest(req: IncomingMessage, res: ServerResponse) {
    console.log('Handling request:', req.url);
    let appid = req.headers.host?.split('.')[0];
    console.log('App ID:', appid);

    if (appid && appid != 'localhost') {
      console.log('Fetching apps.json');
      new Settings().get('apps', 'apps.json').forEach((app: { shortid: string; url: string; }) => {
        console.log('Checking app:', app.shortid);
        if (app.shortid == appid) {
          console.log('Found app:', app);
          res.writeHead(200);
          if (!req.url) return res.end();
          console.log('Sending file:', getAppFile(app.shortid, req.url));
          res.end(getAppFile(app.shortid, req.url));
        }
      });
    } else {
      console.log('Requested host is localhost or not specified');
      res.writeHead(404);
      res.end();
    }
  }
}

function getAppFile(appId: string, filePath: string): string | null {
  const appFolder = `${process.env.ROOT_PATH}/apps/${appId}`;
  const fileFullPath = `${appFolder}/${filePath}`;
  if (existsSync(fileFullPath)) {
    return readFileSync(fileFullPath, 'utf8');
  }
  return null;
}

