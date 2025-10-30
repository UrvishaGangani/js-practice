const time_element = document.querySelector('#time');
const date_element = document.querySelector("#date");

function updateClock() {
  let curr_date = new Date();

  let hours = curr_date.getHours();
  const minutes = curr_date.getMinutes();
  const seconds = curr_date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12; // convert to 12-hour format
  hours = hours ? hours : 12; // 0 => 12

  const h = hours < 10 ? "0" + hours : hours;
  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;

  // Format time string
  const timeString = `${h}:${m}:${s} ${ampm}`;
    time_element.textContent = timeString;
    
    // Format date string
     const days = [
       "Sunday",
       "Monday",
       "Tuesday",
       "Wednesday",
       "Thursday",
       "Friday",
       "Saturday",
     ];
     const months = [
       "January",
       "February",
       "March",
       "April",
       "May",
       "June",
       "July",
       "August",
       "September",
       "October",
       "November",
       "December",
    ];
    const dayName = days[curr_date.getDay()];
    const monthName = months[curr_date.getMonth()];
    const date = curr_date.getDate();
    const year = curr_date.getFullYear();
    const dateString = `${dayName}, ${date} ${monthName} ${year}`;

    date_element.textContent = dateString;
}

updateClock();
setInterval(updateClock, 1000);