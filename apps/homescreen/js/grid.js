(!function (exports) {
  "use strict";
  
  let Grid = {
    init: async function () {
      let rows = await LooxJS.Settings.get('homescreen_rows', 'settings.json');
      let cols = await LooxJS.Settings.get('homescreen_columns', 'settings.json');
      
      console.log("rows: " + rows);
      console.log("cols: " + cols);

      this.generateGrid(rows, cols);
    },

    generateGrid: function (rows, cols) {
      let apps = document.querySelector(".apps");

      for (let i = 0; i < rows; i++) {
        let row = document.createElement("div");
        row.classList.add("app-row");
        apps.appendChild(row);

        for (let j = 0; j < cols; j++) {
          let col = document.createElement("div");
          col.classList.add("app-col");
          row.appendChild(col);
        }
      }
    }
  }
  
  exports.Grid = Grid
}(window))