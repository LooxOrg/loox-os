import { BrowserWindow } from "electron";
import Server from "./server";
import { Settings } from "../settings";
import devices from "../devices";

const { app } = require('electron');

class Main {
  win: BrowserWindow | undefined;

  constructor() {
    this.init();
  }

  init() {
    app.on('ready', this.whenReady.bind(this));
    process.on('uncaughtException', this.handleError.bind(this));

    // Define variables

    console.log(process.argv);
    process.env.OS_TYPE = process.argv[2];
    
    process.env.ROOT_PATH = process.cwd();
  }

  whenReady() {


    this.makeWindow();
  }

  makeWindow() {
    let OS_TYPE = Settings.get('OS_TYPE', 'internal.json');
    let OS_VERSION = Settings.get('OS_VERSION', 'internal.json');
    
    if (!OS_TYPE) {
      OS_TYPE = 'desktop';
    }
    
    if (!OS_VERSION) {
      OS_VERSION = 'unknown';
    }
    if (!process.env.OS_TYPE) {
      process.env.OS_TYPE = OS_TYPE;
    }
    
    process.env.OS_VERSION = OS_VERSION
    
    console.log(OS_TYPE);
    
    let { width, height } = devices[OS_TYPE];
    this.win = new BrowserWindow({
      width: width,
      height: height + 40,
      minHeight: devices["phone"].height,
      minWidth: devices["phone"].width,
      autoHideMenuBar: true,
      transparent: false ,
      frame: false,
      show: true,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
        
      }
    });
    this.win.loadURL('http://org__loox__system.localhost:8081/index.html');
  }

  handleError(_error: Error) {
    console.error(_error);
    this.win?.hide();
  }

}

let server = Server();
let main = new Main();
