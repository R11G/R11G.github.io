let units = [];
let country = "";
let rank = "";
let type = "";
let isImg = true;
function generateTable() {
  const tbl = document.createElement("table");
  tbl.setAttribute("id", "UnitsTable")
  const tblBody = document.createElement("tbody");
  const head = document.createElement("tr");
  const c = document.createElement("th");
  const ci = document.createTextNode("Image");
  c.appendChild(ci);
  head.appendChild(c);
  const c1 = document.createElement("th");
  const ci1 = document.createTextNode("Name");
  c1.appendChild(ci1);
  c1.setAttribute('onclick', "sortTable(1)");
  head.appendChild(c1);
  const c2 = document.createElement("th");
  const ci2 = document.createTextNode("Cost");
  c2.appendChild(ci2);
  c2.setAttribute('onclick', "sortTable(2)");
  head.appendChild(c2);
  const c3 = document.createElement("th");
  const ci3 = document.createTextNode("RP needed");
  c3.appendChild(ci3);
  c3.setAttribute('onclick', "sortTable(3)");
  head.appendChild(c3);
  const c4 = document.createElement("th");
  const ci4 = document.createTextNode("Min repair time");
  c4.appendChild(ci4);
  c4.setAttribute('onclick', "sortTable(4)");
  head.appendChild(c4);
  const c5 = document.createElement("th");
  const ci5 = document.createTextNode("Repair cost");
  c5.appendChild(ci5);
  c5.setAttribute('onclick', "sortTable(5)");
  head.appendChild(c5);
  const c6 = document.createElement("th");
  const ci6 = document.createTextNode("SL multi");
  c6.appendChild(ci6);
  c6.setAttribute('onclick', "sortTable(6)");
  head.appendChild(c6);
  const c7 = document.createElement("th");
  const ci7 = document.createTextNode("RP multi");
  c7.appendChild(ci7);
  c7.setAttribute('onclick', "sortTable(7)");
  head.appendChild(c7);
  const c8 = document.createElement("th");
  const ci8 = document.createTextNode("Rank");
  c8.appendChild(ci8);
  c8.setAttribute('onclick', "sortTable(8)");
  head.appendChild(c8);
  const c9 = document.createElement("th");
  const ci9 = document.createTextNode("BR");
  c9.appendChild(ci9);
  c9.setAttribute('onclick', "sortTable(9)");
  head.appendChild(c9);
  const c10 = document.createElement("th");
  const ci10 = document.createTextNode("Country");
  c10.appendChild(ci10);
  c10.setAttribute('onclick', "sortTable(10)");
  head.appendChild(c10);
  const c11 = document.createElement("th");
  const ci11 = document.createTextNode("Class");
  c11.appendChild(ci11);
  c11.setAttribute('onclick', "sortTable(11)");
  head.appendChild(c11);
  /*headerCell(head, "Image", "n", 0);
  headerCell(head, "Name", "y", 1);
  headerCell(head, "Cost", "y", 2);
  headerCell(head, "RP needed", "y", 3);
  headerCell(head, "Min repair time", "y", 4);
  headerCell(head, "Repair cost", "y", 5);
  headerCell(head, "SL multi", "y", 6);
  headerCell(head, "RP multi", "y", 7);
  headerCell(head, "Rank", "y", 8);
  headerCell(head, "BR", "y", 9);
  headerCell(head, "Country", "y", 10);
  headerCell(head, "Class", "y", 11);*/
  tblBody.appendChild(head);
  for (let i = 0; i < units.length; i++) {
    if (!rank.includes(units[i][8])) {
      continue;
    }
    if (!country.includes(units[i][10])) {
      continue;
    }
    if (!type.includes(units[i][11])) {
      continue;
    }
    const row = document.createElement("tr");
    for (let j = 0; j < units[0].length; j++) {
      const cell = document.createElement("td");
      if (j == 0) {
        const cellInfo = document.createElement("img");
        if (isImg) {
          cellInfo.src = "https://raw.githubusercontent.com/gszabi99/War-Thunder-Datamine/master/tex.vromfs.bin_u/aircrafts/" + units[i][j] + ".png";
        } else {
          cellInfo.src = "https://raw.githubusercontent.com/gszabi99/War-Thunder-Datamine/master/atlases.vromfs.bin_u/units/" + units[i][j] + ".png";
        }
        cell.appendChild(cellInfo);
      } else if (j == 2) {
        if (units[i][j].substring(units[i][j].length - 2) === "LT") {
          const cellInfo = document.createTextNode("Event: " + units[i][j].substring(0,units[i][j].length - 2));
          cell.appendChild(cellInfo);
        } else if (units[i][j].substring(units[i][j].length - 2) === "SL") {
          const cellInfo = document.createTextNode(units[i][j].substring(0,units[i][j].length - 2));
          cell.appendChild(cellInfo);
          const cellInfo2 = document.createElement("img");
          cellInfo2.src = "clicker/28px-Sl_icon.png";
          cell.appendChild(cellInfo2);
        } else {
          if (units[i][j].substring(units[i][j].length - 2) === "GL") {
            const cellInfo = document.createTextNode("Limited/Pack:" + units[i][j].substring(0,units[i][j].length - 2));
            cell.appendChild(cellInfo);
          } else {
            const cellInfo = document.createTextNode(units[i][j].substring(0,units[i][j].length - 2));
            cell.appendChild(cellInfo);
          }
          const cellInfo2 = document.createElement("img");
          cellInfo2.src = "clicker/28px-Ge_icon.png";
          cell.appendChild(cellInfo2);
        }
      } else if (j==4) {
        let hr = parseFloat(units[i][j])/3;
        const day = Math.floor(hr/24);
        hr = hr%24;
        const min = Math.floor(hr%1*60);
        hr = Math.floor(hr);
        let str = "";
        if (day > 0) {
          str += day + "d ";
        }
        if (hr > 0) {
          str += hr + "hr ";
        }
        if (min > 0) {
          str += min + "m";
        }
        const cellInfo = document.createTextNode(str);
        cell.appendChild(cellInfo);
      } else if (j==6 || j == 7) {
        let br = parseFloat(units[i][j]);
        br = Math.round(br*100);
        const cellInfo = document.createTextNode(br + "%");
        cell.appendChild(cellInfo);
        if (j ==7) {
          const cellInfo2 = document.createElement("img");
          cellInfo2.src = "clicker/20px-Rp_icon.png";
          cell.appendChild(cellInfo2);
        } else {
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
      } else {
        const cellInfo = document.createTextNode(units[i][j]);
        cell.appendChild(cellInfo);
        if (j==3) {
          const cellInfo2 = document.createElement("img");
          cellInfo2.src = "clicker/20px-Rp_icon.png";
          cell.appendChild(cellInfo2);
        } else if (j == 5) {
          const cellInfo2 = document.createElement("img");
          cellInfo2.src = "clicker/28px-Sl_icon.png";
          cell.appendChild(cellInfo2);
        }
      }
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  document.body.appendChild(tbl);
  tbl.setAttribute("border", "2");
}
async function readFile(callback) {
  const response = await fetch('https://raw.githubusercontent.com/R11G/R11G.github.io/main/clicker/units.csv');
  const text = await response.text();
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    units[i] = lines[i].split(";");
  }
  if (units[units.length - 1][0] === "") {
    units = deleteRow(units, units.length);
  }
  for (let i = 0; i < units.length; i++) {
    if (units[i][2].substring(units[i][2].length - 2) !== "SL") {
      units[i][3] = 0;
    }
    for (let j = 3; j < 6; j++) {
      if (units[i][j] === "null") {
        units[i][j] = 0;
      }
    }
  }
  callback();
}
function headerCell(row, name, click, num) {
  const c = document.createElement("th");
  const ci = document.createTextNode(name);
  c.appendChild(ci);
  if (click === "y") {
    c.setAttribute('onclick', "sortTable(1)");
  }
  row.appendChild(c);
}
function sortTable(n) {
  document.getElementById("UnitsTable").remove();
  let dir = "des";
  for (let i = 0; i < units.length - 1; i++) {
    if (clean(units[i][n], n) > clean(units[i + 1][n], n)) {
      dir = "asc";
      break;
    }
  }
  for (let i = units.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (dir === "des") {
        if (clean(units[j][n], n) == 100000000 && clean(units[j+1][n], n) == 100000000) {
          if (units[j][n].localeCompare(units[j+1][n]) > 0) {
            const temp = units[j];
            units[j] = units[j+1];
            units[j+1] = temp;
          }
        } else if (clean(units[j][n], n) < clean(units[j+1][n], n)) {
          const temp = units[j];
          units[j] = units[j+1];
          units[j+1] = temp;
        }
      } else {
        if (clean(units[j][n], n) == 100000000 && clean(units[j+1][n], n) == 100000000) {
          if (units[j][n].localeCompare(units[j+1][n]) < 0) {
            const temp = units[j];
            units[j] = units[j+1];
            units[j+1] = temp;
          }
        } else if (clean(units[j][n], n) > clean(units[j+1][n], n)) {
          const temp = units[j];
          units[j] = units[j+1];
          units[j+1] = temp;
        }
      }
    } 
  }
  generateTable();
}
function clean(val, n) {
  if (n == 2) {
    if (val.substring(val.length-2)==="SL") {
      return parseInt(val.substring(0,val.length-2));
    } else if (val.substring(val.length-2)==="LT") {
      return 10000*10000;
    } else {
      return parseInt(val.substring(0,val.length-2)) * 10000;
    }
  } else if (n == 3 || n == 5 || n == 8 || n == 9) {
    return parseInt(val);
  } else if (n == 4 || n == 6 || n == 7) {
    return parseFloat(val);
  } else {
    return val;
  }
}
function deleteRow(arr, row) {
  arr = arr.slice(0);
  arr.splice(row - 1, 1);
  return arr;
}
function chooseCountry() {
  var c = document.getElementById("countryList");
  var t = document.getElementById("typeList");
  var r = document.getElementById("rankList");
  if (c.style.display === "none") {
    c.style.display = "grid";
    t.style.display = "none";
    r.style.display = "none";
 } else {
       c.style.display = "none";
   }
}
function chooseType() {
  var c = document.getElementById("countryList");
  var t = document.getElementById("typeList");
  var r = document.getElementById("rankList");
  if (t.style.display === "none") {
    c.style.display = "none";
    t.style.display = "grid";
    r.style.display = "none";
 } else {
       t.style.display = "none";
   }
}
function chooseRank() {
  var c = document.getElementById("countryList");
  var t = document.getElementById("typeList");
  var r = document.getElementById("rankList");
  if (r.style.display === "none") {
    c.style.display = "none";
    t.style.display = "none";
    r.style.display = "grid";
 } else {
       r.style.display = "none";
   }
}
function filterCountry() {
  let countries = document.getElementById("countryList").getElementsByTagName("input");
  country = "";
  for (var i = 0; i < countries.length; i++) {
    if (countries[i].type == "checkbox") {
      if (countries[i].checked) {
        country += countries[i].id + ",";
      } 
    }
  }
  chooseCountry();
  document.getElementById("UnitsTable").remove();
  generateTable();
}
function filterType() {
  let types = document.getElementById("typeList").getElementsByTagName("input");
  type = "";
  for (var i = 0; i < types.length; i++) {
    if (types[i].type == "checkbox") {
      if (types[i].checked) {
        type += types[i].id + ",";
      }
    }
  }
  chooseType();
  document.getElementById("UnitsTable").remove();
  generateTable();
}
function filterRank() {
  let ranks = document.getElementById("rankList").getElementsByTagName("input");
  rank = "";
  for (var i = 0; i < ranks.length; i++) {
    if (ranks[i].type == "checkbox") {
      if (ranks[i].checked) {
        rank += ranks[i].id + ",";
      }
    }
  }
  chooseRank();
  document.getElementById("UnitsTable").remove();
  generateTable();
}
function resetCountry() {
  let countries = document.getElementById("countryList").getElementsByTagName("input");
  for (var i = 0; i < countries.length; i++) {
    if (countries[i].type == "checkbox") {
      if (countries[i].checked) {
        countries[i].checked = false;
      }
      country += countries[i].id + ",";
    }
  }
  chooseCountry();
  document.getElementById("UnitsTable").remove();
  generateTable();
}
function resetType() {
  let types = document.getElementById("typeList").getElementsByTagName("input");
  for (var i = 0; i < types.length; i++) {
    if (types[i].type == "checkbox") {
      if (types[i].checked) {
        types[i].checked = false;
      }
      type += types[i].id + ",";
    }
  }
  chooseType();
  document.getElementById("UnitsTable").remove();
  generateTable();
}
function resetRank() {
  let ranks = document.getElementById("rankList").getElementsByTagName("input");
  for (var i = 0; i < ranks.length; i++) {
    if (ranks[i].type == "checkbox") {
      if (ranks[i].checked) {
        ranks[i].checked = false;
      }
      rank += ranks[i].id + ",";
    }
  }
  chooseRank();
  document.getElementById("UnitsTable").remove();
  generateTable();
}
function initFilters() {
  let countries = document.getElementById("countryList").getElementsByTagName("input");
  for (var i = 0; i < countries.length; i++) {
    if (countries[i].type == "checkbox") {
      country += countries[i].id + ",";
    }
  }
  let ranks = document.getElementById("rankList").getElementsByTagName("input");
  for (var i = 0; i < ranks.length; i++) {
    if (ranks[i].type == "checkbox") {
      rank += ranks[i].id + ",";
    }
  }
  let types = document.getElementById("typeList").getElementsByTagName("input");
  for (var i = 0; i < types.length; i++) {
    if (types[i].type == "checkbox") {
      type += types[i].id + ",";
    }
  }
}
function swapImg() {
  if (isImg) {
    document.getElementById("Image").innerText = "Card Image";
  } else {
    document.getElementById("Image").innerText = "Vehicle Icon";
  }
  isImg = !isImg;
  document.getElementById("UnitsTable").remove();
  generateTable();
}