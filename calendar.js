
function display() {
   let data = [
               {date: '2022-06-24', start_time: '11:00', end_time: '12:30', description: 'Äijä-ringette vuoro'},
               {date: '2022-06-25', start_time: '14:00', end_time: '17:00', description: 'Roskien keräystalkoot'},
               {date: '2022-06-26', start_time: '18:00', end_time: '19:00', description: 'B-tyttöjen ringette'},
               {date: '2022-06-26', start_time: '19:00', end_time: '20:30', description: 'Naisten maajoukkue'},
               {date: '2022-06-28', start_time: '18:00', end_time: '20:00', description: 'Naisten maajoukkue'}
              ];
   let calendarHTML="";
   let today = new Date();
   let current_month = today.getMonth();
   let current_year = today.getFullYear();
   let days_in_current_month = new Date(current_year, current_month + 1, 0).getDate();
   console.log(`days in current month = ${days_in_current_month}`);
   let day = 1; 
   let empty_days_at_start = new Date(current_year, current_month, day).getDay() - 1;
   let header = today.toLocaleString('fi-FI', { month: 'long' });
   calendarHTML += `<div class="calendar-container">`;
   calendarHTML += `<div class="month-header"><h2>${header}</h2></div>`;
   calendarHTML += `<div class="weekday-header-container">`;
   calendarHTML += `<div class="weekday-header"><h3>Maanantai</h3></div>`;
   calendarHTML += `<div class="weekday-header"><h3>Tiistai</h3></div>`;
   calendarHTML += `<div class="weekday-header"><h3>Keskiviikko</h3></div>`;
   calendarHTML += `<div class="weekday-header"><h3>Torstai</h3></div>`;
   calendarHTML += `<div class="weekday-header"><h3>Perjantai</h3></div>`;
   calendarHTML += `<div class="weekday-header"><h3>Lauantai</h3></div>`;
   calendarHTML += `<div class="weekday-header"><h3>Sunnuntai</h3></div>`;
   calendarHTML += `</div>`;
   calendarHTML += `<div class="month"><div class="week">`;
   for (let j = 0; j < empty_days_at_start; j++) {
      calendarHTML += `<div class="day empty"></div>`;
   }

   while (day <= days_in_current_month){
      let newdate = new Date(current_year, current_month, day);
      console.log(newdate);
      let days_events_array = data.filter((item) => item.date == newdate.toISOString().slice(0,10));
      let events_text = "";
      if (Array.isArray(days_events_array) && days_events_array.length) {
         console.log(`event found at date = ${newdate}`);
         for (let i=0; i<days_events_array.length; i++) {
            events_text += `<span class="event-time">${days_events_array[i].start_time}-${days_events_array[i].end_time}</span> <span class="event-description">${days_events_array[i].description}</span><br>`;
         }
         
      }
      calendarHTML += `<div class="day"><span class="day-number">${day}</span><br>${events_text}</div>`;
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
   calendarHTML += `</div>`;
   document.getElementById('kalenteri').innerHTML = calendarHTML;
}

display();
