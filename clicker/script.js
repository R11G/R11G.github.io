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
function readFile(file) {
  let reader = new FileReader();
  reader.onload = (e) => {
    const file = e.target.result;
    const lines = file.split(/\r\n|\n/);
    for (var i = 0; i < lines.length; i++) {
      units[i] = lines[i].split(";");
    }
  }
  reader.readAsText(file);
}
function displayTable() {
  let table = document.createElement('table');
  for (let row of units) {
    table.insertRow();
    for (let cell of row) {
      let newCell = table.rows[table.rows.length - 1].insertCell();
      newCell.textContent = cell;
    }
  }
  document.body.appendChild(table);
}
function loadUnits() {
  const unitFile = new File([], "units.csv");
  readFile(unitFile);
  displayTable();
}