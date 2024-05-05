import { BrowserWindow } from "electron";
import Server from "./server";
import Settings from "../settings";
import devices from "../devices";

const { app } = require('electron');

class Main {

  constructor() {
    this.init();
  }

  init() {
    app.on('ready', this.whenReady.bind(this));
    
    process.env.ROOT_PATH = process.cwd();
  }

  whenReady() {
    server.init();
    this.makeWindow();
  }
  
  makeWindow() {
    let device = new Settings().get('OS_TYPE', 'internal.json');

    if (!device) {
      device = 'desktop';
    }
    console.log(device);

    let { width, height } = devices[device];
    let win = new BrowserWindow({
      width: width,
      height: height + 40,
      autoHideMenuBar: true,
      transparent: true,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true
      }
    });
    win.loadURL('http://system.localhost:8081/index.html');
  }
}
let server = new Server();
let main = new Main();
