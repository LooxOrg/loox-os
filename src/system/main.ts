import { app } from "electron"

let Main = {
  init: () => {
    app.once("ready", this.whenReady)
  }, 
  whenReady: () => {
    console.log('whenReady')
  }
}

Main.init()