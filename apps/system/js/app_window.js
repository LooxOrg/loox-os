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
      this.manifestUrl = new URL(manifestUrl);
      this.manifest = await this.fetchManifest(this.manifestUrl);
      let existingWindow = document.querySelector(`[data-manifest-url="${this.manifestUrl.origin}"]`);

      if (existingWindow) {
        existingWindow.focus();
        console.log("Focus on existing window");
      } else {
        this.createWindow(this.manifest);
        console.log("Create new window");
      }
    },

    fetchManifest: function (manifestUrl) {
      return fetch(manifestUrl)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Failed to fetch manifest: ${response.status}`);
        })
        .catch(error => {
          console.error('Error fetching manifest:', error);
          throw error;
        });
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