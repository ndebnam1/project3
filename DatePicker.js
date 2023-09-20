'use strict';


class DatePicker {
    constructor(id, dateSelectionCallback) {
      this.container = document.getElementById(id);
      this.dateSelectionCallback = dateSelectionCallback;
      this.currentDate = null;
    }
 
    render(date) {
      this.currentDate = date;
      this.container.innerHTML = ''; // Clear the container
 
      // Create header with controls and month/year display
      const header = document.createElement('div');
      header.classList.add('datepicker-header');
 
      const prevButton = document.createElement('button');
      prevButton.innerHTML = '<';
      prevButton.addEventListener('click', () => this.showPreviousMonth());
      header.appendChild(prevButton);
  
      const monthYear = document.createElement('div');
      monthYear.classList.add('month-year');
      monthYear.textContent = this.getMonthYearString(this.currentDate);
      header.appendChild(monthYear);
 
      const nextButton = document.createElement('button');
      nextButton.innerHTML = '>';
      nextButton.addEventListener('click', () => this.showNextMonth());
      header.appendChild(nextButton);
 
      this.container.appendChild(header);
 
      // Create table for the calendar
      const table = document.createElement('table');
      table.classList.add('datepicker-table');
 
      // Create table header with day abbreviations
      const dayAbbreviations = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      const headerRow = document.createElement('tr');
      dayAbbreviations.forEach((day) => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);
 
      // Calculate the first day of the month
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const startingDay = firstDayOfMonth.getDay();
 
      let currentDate = 1;
 
      // Create rows and cells for the calendar
      for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
 
        for (let j = 0; j < 7; j++) {
          const cell = document.createElement('td');
 
          if (i === 0 && j < startingDay) {
            // Previous month's days
            const prevMonthDate = new Date(
              date.getFullYear(),
              date.getMonth() - 1,
              daysInMonth - startingDay + j + 1
            );
            cell.textContent = prevMonthDate.getDate();
            cell.classList.add('prev-month');
            cell.addEventListener('click', () =>
              this.handleDateClick(prevMonthDate)
            );
          } else if (currentDate <= daysInMonth) {
            // Current month's days
            cell.textContent = currentDate;
            cell.addEventListener('click', () =>
              this.handleDateClick(new Date(date.getFullYear(), date.getMonth(), currentDate))
            );
            if (currentDate === date.getDate()) {
              cell.classList.add('selected-date');
            }
            currentDate++;
          } else {
            // Next month's days
            const nextMonthDate = new Date(
              date.getFullYear(),
              date.getMonth() + 1,
              currentDate - daysInMonth
            );
            cell.textContent = nextMonthDate.getDate();
            cell.classList.add('next-month');
            cell.addEventListener('click', () =>
              this.handleDateClick(nextMonthDate)
            );
            currentDate++;
          }
 
          row.appendChild(cell);
        }
 
        table.appendChild(row);
      }
 
      this.container.appendChild(table);
    }
 
    showPreviousMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render(this.currentDate);
    }
 
    showNextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render(this.currentDate);
    }
 
    handleDateClick(date) {
      if (typeof this.dateSelectionCallback === 'function') {
        this.dateSelectionCallback(this.container.id, {
          month: date.getMonth() + 1,
          day: date.getDate(),
          year: date.getFullYear(),
        });
      }
    }
 
    getMonthYearString(date) {
      const options = { year: 'numeric', month: 'long' };
      return date.toLocaleDateString(undefined, options);
    }
  }
 
  // Usage
  var datePicker1 = new DatePicker('div1', function (id, fixedDate) {
    console.log(
      'DatePicker with id',
      id,
      'selected date:',
      fixedDate.month + '/' + fixedDate.day + '/' + fixedDate.year
    );
  });
  datePicker1.render(new Date());
 
  var datePicker2 = new DatePicker('div2', function (id, fixedDate) {
    console.log(
      'DatePicker with id',
      id,
      'selected date:',
      fixedDate.month + '/' + fixedDate.day + '/' + fixedDate.year
    );
  });
  datePicker2.render(new Date('January 1, 2009'));
