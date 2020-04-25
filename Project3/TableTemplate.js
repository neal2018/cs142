class TableTemplate {

  /**
   * fill in the given table
   * @param {string} id 
   * @param {dictionary} dict 
   * @param {string} col 
   */
  static fillIn(id, dict, col) {
    const table = document.getElementById(id);
    const tbody = table.tBodies[0];

    const fillInTd = (str, myDict) => {
      return (new Cs142TemplateProcessor(str)).fillIn(myDict);
    };

    const header = tbody.rows[0];
    let cnt = 0;
    let colLoc = -1;

    for (const headerTd of header.cells) {
      headerTd.innerHTML = fillInTd(headerTd.innerHTML, dict);
      if (headerTd.innerHTML === col) {
        colLoc = cnt;
      }
      ++cnt;
    }

    for (const tr of tbody.rows) {
      cnt = 0;
      for (const td of tr.cells) {
        if (col === undefined || cnt === colLoc) {
          td.innerHTML = fillInTd(td.innerHTML, dict);
        }
        ++cnt;
      }
    }

    table.style.visibility = "visible";
  }
}