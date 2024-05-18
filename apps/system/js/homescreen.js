
document.addEventListener("DOMContentLoaded", async function () {
  try {
    let deviceType = await LooxJS.Device.getType();
    console.log(deviceType);
    
    if (deviceType == "phone" || deviceType == "tablet") {
      await homescreen.init();
      return;
    }
  } catch (error) {
    criticalError("Critical Error in Homescreen", error);
  }

})

let homescreen = {
  init: async function () {  
    
    let webview = document.createElement("webview");
    let webviewContainer = document.querySelector(".windows");

    new AppWindow("http://homescreen.localhost:8081/manifest.json");
    return
    let BaseUserAgent = "Mozilla/5.0 (Linux; Andorid 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/124.0.0.0 LooxOS/1.0.0";
    
    if (deviceType == "phone") {
      webview.useragent = BaseUserAgent + " Mobile";
    } else if (deviceType == "tablet") {
      webview.useragent = BaseUserAgent + " Tablet";
    } else if (deviceType == "desktop" || deviceType == "laptop" || deviceType == "smart_tv") {
      webview.useragent = BaseUserAgent;
    }
    let webviewDebug = false;
    
    if (webviewDebug) {
      webview.src = "http://google.com";
    } else {
      webview.src = "http://homescreen.localhost:8081/index.html";
    }
    webview.classList.add("webview");
    
    
    webviewContainer.appendChild(webview);
  }
}