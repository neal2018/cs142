"use strict";
class DatePicker {
  /**
   * constructor
   * @param {string} divID 
   * @param {function(string, Date) => void} callback
   */
  constructor(divID, callback) {
    this.divID = divID;
    this.callback = callback;
  }

  /**
   * selects the month of this date
   * replaces divID's contents with HTML that displays a 
   * one month calendar.
   * @param {Date} date 
   */
  render(date) {

    document.getElementById(this.divID).innerHTML = `
<span id="previous-${this.divID}" class="leftButton"> \< </span>
<span id="header-${this.divID}" class = "header">  </span>
<span id="next-${this.divID}"  class="rightButton" >  \>  </span>
<table id="cal-${this.divID}" >
</table>`;

    const cal = document.getElementById(`cal-${this.divID}`);
    const header = document.getElementById(`header-${this.divID}`);
    
    /**
     * generate a new calendar for cal
     */
    const getCal = (date) => {
      cal.innerHTML = `
      <tr>
      <th>Sun</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>
      </tr>`;
      const firstDay = new Date(+date); //+ is used to convert date into numbers
      firstDay.setDate(1);
      
      const currDate = new Date(+firstDay);
      
      const lastDay = new Date(+date);
      lastDay.setMonth(date.getMonth() + 1);
      lastDay.setDate(0);
      
      const numWeeks = Math.ceil((firstDay.getDay() + lastDay.getDate()) / 7);
      currDate.setDate(currDate.getDate() - currDate.getDay());
      for (let week = 0; week < numWeeks; ++week) {
        const tr = document.createElement("tr");
        tr.innerHTML = "";
        for (let day = 0; day < 7; ++day) {
          const td = document.createElement("td");
          td.innerHTML = `${currDate.getDate()}`;
          const isCurrMonth = firstDay.getMonth() === currDate.getMonth();
          td.className = isCurrMonth ? "normal" : "dim";
          const recordedDate = new Date(+currDate);
          td.onclick = isCurrMonth ?
          () => {
            this.callback(this.divID, {
              day: recordedDate.getDate(),
              month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(recordedDate),
              year: recordedDate.getFullYear()
            });
            
            // cancel other selected
            let currCal = td.parentNode.parentNode;
            for (let currTr of currCal.childNodes) {
              for (let currTd of currTr.childNodes) {
                if (currTd.className === "selected") {
                  currTd.className = "normal";
                }
              }
            }
            
            td.className = "selected";
          } : () => { };
          tr.appendChild(td);
          currDate.setDate(currDate.getDate() + 1);
        }
        cal.appendChild(tr);
      }
    };
    
    /**
     * change the month of the calendar
     * @param {int} inc 
     */
    const changeMonth = (inc) => {
      date.setMonth(date.getMonth() + inc, 1);
      getCal(date);
    };


    const previous = document.getElementById(`previous-${this.divID}`);
    const next = document.getElementById(`next-${this.divID}`);
    
    previous.onclick = () => {
      changeMonth(-1);
      header.innerHTML = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) +
      " " + date.getFullYear();
    };
    
    
    next.onclick = () => {
      changeMonth(1);
      header.innerHTML = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) +
      " " + date.getFullYear() + " ";
    };

    header.innerHTML = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) +
      " " + date.getFullYear() + " ";

    getCal(date);
  }
}


