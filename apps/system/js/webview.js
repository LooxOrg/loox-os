document.addEventListener("DOMContentLoaded", async function () {
  try {
    await Webview.init();
  } catch (error) {
    criticalError("Critical Error in Webview", error);
  }

})

let Webview = {
  init: async function () {  
    
    let deviceType = await LooxJS.Device.getType();
    console.log(deviceType);
    let webview = document.createElement("webview");
    let webviewContainer = document.querySelector(".webview-container");
    
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