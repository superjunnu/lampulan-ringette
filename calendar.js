// Funktiota previous_month ja next_month kutsutaan kun kalenterin nuolia klikataan.
// Niille annetaan parametreiksi kalenterissa näkyvä kuukausi ja vuosi ja ne luovat kalenterin
// uudelleen seuraavalla tai edellisellä kuukaudella.

function previous_month(cur_year, cur_month) {
   if (cur_month == 0) { 
      cur_month = 11;
      cur_year -= 1;
   } else {
      cur_month -= 1;
   }
   calendar(cur_year, cur_month);
}

function next_month(cur_year, cur_month) {
   if (cur_month == 11) { 
      cur_month = 0;
      cur_year += 1;
   } else {
      cur_month += 1;
   }
   
   calendar(cur_year, cur_month);
}

function calendar(year, month) {

   // Vähän testidataa kalenteriin
   let data = [
               {date: '2022-06-24', start_time: '11:00', end_time: '12:30', description: 'Äijä-ringette vuoro'},
               {date: '2022-06-25', start_time: '14:00', end_time: '17:00', description: 'Roskien keräystalkoot'},
               {date: '2022-06-26', start_time: '18:00', end_time: '19:00', description: 'B-tyttöjen ringette'},
               {date: '2022-06-26', start_time: '19:00', end_time: '20:30', description: 'Naisten maajoukkue'},
               {date: '2022-06-28', start_time: '18:00', end_time: '20:00', description: 'Naisten maajoukkue'}
              ];

   // Tähän muuttujaan kirjoitetaan kalenterin HTML-koodi pala palalta
   let calendarHTML="";
   let current_month = month;
   let current_year = year;
   let day = 1; 
   let start_date = new Date(year, month, day);
   
   let days_in_current_month = new Date(year, month + 1, 0).getDate();
   let start_weekday = new Date(year, month, day).getDay();
   let empty_days_at_start = start_weekday === 0 ? 6 : start_weekday - 1
   let month_and_year = start_date.toLocaleString('fi-FI', { month: 'long', year: 'numeric' });

   calendarHTML += `<div class="calendar-container">`;
   calendarHTML += `<div class="calendar-header-container">
                     <button class="prev-month" onClick="previous_month(${year},${month})"><</button>
                     <span class="month-year">${month_and_year}</span>
                     <button onClick="next_month(${year},${month})" class="next-month">></button>
                     </div>`;
   calendarHTML += `<div class="weekday-header-container">`;
   calendarHTML += `<div class="weekday-header">Maanantai</div>`;
   calendarHTML += `<div class="weekday-header">Tiistai</div>`;
   calendarHTML += `<div class="weekday-header">Keskiviikko</div>`;
   calendarHTML += `<div class="weekday-header">Torstai</div>`;
   calendarHTML += `<div class="weekday-header">Perjantai</div>`;
   calendarHTML += `<div class="weekday-header">Lauantai</div>`;
   calendarHTML += `<div class="weekday-header">Sunnuntai</div>`;
   calendarHTML += `</div>`;
   calendarHTML += `<div class="month"><div class="week">`;
   for (let j = 0; j < empty_days_at_start; j++) {
      calendarHTML += `<div class="day empty"></div>`;
   }

   while (day <= days_in_current_month){
      let newdate = new Date(year, month, day);
      let days_events_array = data.filter((item) => item.date == newdate.toISOString().slice(0,10));
      let events_text = "";
      if (Array.isArray(days_events_array) && days_events_array.length) {
         for (let i=0; i<days_events_array.length; i++) {
            events_text += `<span class="event-time">${days_events_array[i].start_time}-${days_events_array[i].end_time}</span> 
                            <span class="event-description">${days_events_array[i].description}</span><br>`;
         }
         
      }
      calendarHTML += `<div class="day"><span class="day-number">${day}</span><br>${events_text}</div>`;
      if (newdate.getDay() == 0) {
         calendarHTML += `</div><div class="week">`;
      }
      day++;
   }
   
   let empty_days_at_end = 7 - new Date(year, month, days_in_current_month).getDay();
   for (let j = 0; j < empty_days_at_end; j++) {
      calendarHTML += `<div class="day empty"></div>`;
   }
   calendarHTML += `</div></div>`;
   calendarHTML += `</div>`;
   document.getElementById('kalenteri').innerHTML = calendarHTML;
}

// Oletusarvoisesti näytetään kuluvan kuukauden ja vuoden kalenteri.
let default_month = new Date().getMonth();
let default_year = new Date().getFullYear();
calendar(default_year, default_month);
