
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

  handleRequest(request: IncomingMessage, response: ServerResponse) {
    const host = request.headers.host?.split('.')[0];

    if (!host || host === 'localhost') {
      response.writeHead(404);
      response.end();
      return;
    }

    const apps = new Settings().get('apps', 'apps.json');
    const app = apps.find((app: { shortid: string; }) => app.shortid === host);

    if (!app) {
      response.writeHead(404);
      response.end();
      return;
    }
    console.log("request", app.shortid, request.url);
    response.writeHead(200);
    const filePath = getAppFile(app.shortid, request.url || '');
    if (filePath) {
      response.end(filePath);
    } else {
      response.end();
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

