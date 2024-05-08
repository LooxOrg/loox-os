document.addEventListener("DOMContentLoaded", async function () {
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
  webview.src = "https://www.google.com";
  webview.classList.add("webview");
  
  
  webviewContainer.appendChild(webview);
})