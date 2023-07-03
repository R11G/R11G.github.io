let sl = 0;
let ge = 0;
let debt = 0;
let units = [];
function baseBombed() {
  sl += 1000;
}
function creditCard() {
  ge += 100;
  debt++;
}
function generateTable() {
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");
  for (let i = 0; i < units.length; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < units[0].length; j++) {
      const cell = document.createElement("td");
      if (j == 0) {
        const cellInfo = document.createElement("img");
        cellInfo.src = "StatcardImages/" + units[i][j] + ".png";
        cell.appendChild(cellInfo);
      } else if (j == 2) {
        if (units[i][j].substring(units[i][j].length - 2) === "GE") {
          const cellInfo = document.createTextNode(units[i][j].substring(0,units[i][j].length - 2));
          cell.appendChild(cellInfo);
          const cellInfo2 = document.createElement("img");
          cellInfo2.src = "clicker/28px-Ge_icon.png";
          cell.appendChild(cellInfo2);
        } else {
          const cellInfo = document.createTextNode(units[i][j].substring(0,units[i][j].length - 2));
          cell.appendChild(cellInfo);

          const cellInfo2 = document.createElement("img");
          cellInfo2.src = "clicker/28px-Sl_icon.png";
          cell.appendChild(cellInfo2);
        }
      } else if (j==9) {
        let br = parseInt(units[i][j]);
        let mod = br%3;
        br = Math.floor(br/3) * 1 + 1;
        if (mod == 1) {
          br += .3;
        } else if (mod == 2) {
          br += .7;
        }
        const cellInfo = document.createTextNode(br);
        cell.appendChild(cellInfo);
      } else if (j==10) {
        const cellInfo = document.createElement("img");
        cellInfo.src = "CountryIcons/" + units[i][j] + ".svg";
        cell.appendChild(cellInfo);
      } else if (j==11) {
        const cellInfo = document.createTextNode(units[i][j].substring(4));
        cell.appendChild(cellInfo);
      } else {
        const cellInfo = document.createTextNode(units[i][j]);
        cell.appendChild(cellInfo);
      }
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
}
async function readFile(callback) {
  const response = await fetch('https://raw.githubusercontent.com/R11G/R11G.github.io/main/clicker/units.csv');
  const text = await response.text();
  const lines = text.split(/\r?\n/);
  for (var i = 0; i < lines.length; i++) {
    units[i] = lines[i].split(";");
  }
  callback();
}