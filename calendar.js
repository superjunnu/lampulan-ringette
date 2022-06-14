function display() {

   let calendarHTML="";
   let today = new Date();
   let array = [];
   let current_month = today.getMonth();
   let current_year = today.getFullYear();
   let days_in_current_month = new Date(current_year, current_month + 1, 0).getDate();
   console.log(`days in current month = ${days_in_current_month}`);
   let day = 1; 
   let empty_days_at_start = new Date(current_year, current_month, day).getDay() - 1;
   let header = today.toLocaleString('default', { month: 'long' });
   calendarHTML += `<div class="header"><h2>${header}</h2></div>`;
   calendarHTML += `<div class="month"><div class="week">`;
   for (let j = 0; j < empty_days_at_start; j++) {
      calendarHTML += `<div class="day empty"></div>`;
   }

   while (day <= days_in_current_month){
      let newdate = new Date(current_year, current_month, day);
      array.push(newdate);
      calendarHTML += `<div class="day">${day}</div>`;
      if (newdate.getDay() == 0) {
         calendarHTML += `</div><div class="week">`;
      }
      day++;
   }
   
   let empty_days_at_end = 7 - new Date(current_year, current_month, days_in_current_month).getDay();
   for (let j = 0; j < empty_days_at_end; j++) {
      calendarHTML += `<div class="day empty"></div>`;
   }

   calendarHTML += `</div></div>`;
   document.getElementById('kalenteri').innerHTML = calendarHTML;
}

display();
