const LooxJS = {
  Settings: {
    async get(key, file) {
      if (!file) file = "settings.json";
      
      let response = await fetch("http://localhost:8081/api/settings/get?key=" + key + "&file=" + file)
        .then((response) => response.json())
        .then((data) => {
          return data.value;
        });

      return response;
    },
  },
  Device: {
    async getType() {
      
      let response = await fetch("http://localhost:8081/api/device/getType")
        .then((response) => response.json())
        .then((data) => {
          return data.type;
        });
      
      return response;
    }
  },
  LazyLoader: {
    async load() {
      let response = await fetch("http://localhost:8081/api/apps/getAll")
        .then((response) => response.json())
        .then((data) => {
          return data.apps;
        });
      
      return response;
    }
  }
}