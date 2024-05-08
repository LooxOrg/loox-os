let isStatusBarVisible = false;
let deviceWithStatusBar = ["phone", "tablet"];
document.addEventListener("DOMContentLoaded", async function () {
  let deviceType = await LooxJS.Device.getType()
  
  if (deviceWithStatusBar.includes(deviceType)) {
    StatusBar.init();
  }
})


let StatusBar = {
  init: async function () {
    let statusbar = document.querySelector(".statusbar");
    let deviceType = await LooxJS.Device.getType()
  
  }
}