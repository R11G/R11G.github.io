let sl = 0;
let ge = 0;
let debt = 0;
let units = [];
let input = document.querySelector('input');
let textarea = document.querySelector('textarea');
function baseBombed() {
  sl += 1000;
}
function creditCard() {
  ge += 100;
  debt++;
}
function generateTable() {
  // creates a <table> element and a <tbody> element
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < units.length; i++) {
    // creates a table row
    const row = document.createElement("tr");

    for (let j = 0; j < units[0].length; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement("td");
      if (j == 0) {
        const cellInfo = document.createElement("img");
        cellInfo.src = "StatcardImages/" + units[i][j] + ".png";
        cell.appendChild(cellInfo);
      } else {
        const cellInfo = document.createTextNode(units[i][j]);
        cell.appendChild(cellInfo);
      }
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
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