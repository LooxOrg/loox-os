!(function (exports) {

  function AppWindow(manifestUrl, configuration) {
    if (manifestUrl) {
      this.manifestUrl = manifestUrl;
      this.create(manifestUrl, configuration);
      console.log("AppWindow created");
    }
  }

  AppWindow.prototype = {
    manifestUrl: null,
    manifest: null,

    create: async function (manifestUrl, configuration) {
      console.log("manifestUrl: " + manifestUrl);
      this.manifestUrl = new URL(manifestUrl);
      this.manifest = await this.fetchManifest(this.manifestUrl);
      let existingWindow = document.querySelector(`[data-manifest-url="${this.manifestUrl.origin}"]`);
      
      console.log("existingWindow: " + existingWindow);
      if (existingWindow) {
        console.log("Focus on existing window");
        existingWindow.focus();
      } else {
        console.log("Create new window");
        this.createWindow(this.manifest);
      }
    },
    
    fetchManifest: async function (manifestUrl) {
      let response = await fetch(manifestUrl)
      .then((response) => response.json())
      .then((data) => {
        return data.type;
      });
    
    return response;
    },
    createWindow: async function () {
      let entry = this.manifest.entry;
      let url = new URL(entry, this.manifestUrl);
      let deviceType = await LooxJS.Device.getType();
      let windowDiv = document.createElement("div");


      if (deviceType != "phone" || deviceType != "tablet" || deviceType == "desktop" || deviceType == "laptop" || deviceType != "smart_tv") {
        this.createWindowTitleBar(windowDiv);
      }

      windowDiv.classList.add("window");
      windowDiv.setAttribute("data-manifest-url", this.manifestUrl.origin);
      document.querySelector(".windows").appendChild(windowDiv);
    },

    createWindowTitleBar: function (windowDiv) {
      let titleBar = document.createElement("div");
      titleBar.classList.add("title-bar");
      let title = document.createElement("span");
      title.classList.add("title");
      title.innerHTML = this.manifest.name;
      titleBar.appendChild(title);
      document.querySelector(".windows").appendChild(titleBar);
    }

  }

  exports.AppWindow = AppWindow
}(window))