// Importing required modules
import express, { Application, Request, Response } from 'express';
import http, { IncomingMessage, ServerResponse, createServer } from 'http';
import fs from 'fs';
import Apps from '../apps';
import {Settings} from '../settings';
import { Console } from 'console';
import { hostname } from 'os';

let ex = express();

let MIME = {
  "html": "text/html",
  "js": "text/javascript",
  "css": "text/css",
  "json": "application/json",
  "png": "image/png",
  "jpg": "image/jpg",
  "mp3": "audio/mpeg",
  "mp4": "video/mp4"
};
export default function () {
  let server = createServer((req: IncomingMessage, res: ServerResponse) => {
    
    let hostname = req.headers.host?.split('.')[0];
    let hostsLength = req.headers.host?.split('.').length;
    let path = req.url?.split('?')[0];
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
    if (hostname?.startsWith("localhost") && hostsLength === 1) {
      
      if (path?.startsWith("/shared")) {
        let filePath = process.cwd() + path;
        
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.writeHead(200, { "Content-Type": MIME[path.split(".").pop() as keyof typeof MIME] });
          res.end(fs.readFileSync(filePath));
        } else {
          res.writeHead(404);
          res.end();
        }
      } else if (path?.startsWith("/api/")) {
        ex(req, res);
      }
    } else if (!hostname?.startsWith("localhost") && hostname && hostsLength == 2) {
      hostname = hostname.replaceAll("__", ".");
      let filePath = process.cwd() + "/apps/" + hostname + "/" + path;
      
      console.log("Checking Apps")
      console.log("Against: " + hostname);
      
      for (let app of Apps.getAll()) {
        console.log("Checking app: " + app.package);
        if (app.package === hostname) {
          console.log(app.package + " matches: " + hostname);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.writeHead(200);
            res.end(fs.readFileSync(filePath));
            console.log("File found: " + filePath);
          } else {
            console.log("File not found: " + filePath);
            res.writeHead(404);
            res.end();
          }
          return;
        }
      }
      
      res.writeHead(404);
      res.end();
      //let filePath = process.cwd() + "/apps/" + hostname + "/" +path;
      //
      //if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      //  res.writeHead(200);
      //  res.end(fs.readFileSync(filePath));
      //} else {
      //  res.writeHead(404);
      //  res.end();
      //}
    }
  
  });
  server.listen(8081);
}

ex.get('/api/apps/getAll', (req: Request, res: Response) => {
  res.send({ apps: Apps.getAll() });
})
ex.get('/api/apps/get', async (req: Request, res: Response) => {
  let app = await Apps.get(req.query.id as string);
  console.log(app);
  if (app) {
    res.send({ app });
    console.log("app manifest sent");
  } else {
    console.log("app manifest not found");
    res.sendStatus(404);
    //res.send({ app: null });
  }
  
})

ex.get('/api/settings/get', (req: Request, res: Response) => {
  res.send({ value: Settings.get(req.query.key as string, req.query.file as string | undefined) });
})

ex.get("/api/device/getType", (req: Request, res: Response) => {
  res.send({ type: process.env.OS_TYPE });
})

