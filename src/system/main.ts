import { BrowserWindow } from "electron";
import Server from "./server";
import { Settings } from "../settings";
import devices from "../devices";
import Apps from "../apps";

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


    this.makeWindow();
  }

  makeWindow() {
    let device = Settings.get('OS_TYPE', 'internal.json');

    if (!device) {
      device = 'desktop';
    }
    
    process.env.OS_TYPE = device; 

    console.log(device);

    let { width, height } = devices[device];
    let win = new BrowserWindow({
      width: width,
      height: height + 40,
      autoHideMenuBar: true,
      transparent: true,
      frame: false,
      show: true,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true
      }
    });
    win.loadURL('http://system.localhost:8081/index.html');
  }

}

let server = Server();
let main = new Main();
