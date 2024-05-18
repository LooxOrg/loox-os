
document.addEventListener("DOMContentLoaded", async function () {
  Grid.init();

  //let rows = await LooxJS.Settings.get('homescreen_rows', 'settings.json');
  //let cols = await LooxJS.Settings.get('homescreen_columns', 'settings.json');
  //
  //console.log("rows: " + rows);
  //console.log("cols: " + cols);
  //generateGrid(rows, cols);
})


function generateGrid(rows, cols) {
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