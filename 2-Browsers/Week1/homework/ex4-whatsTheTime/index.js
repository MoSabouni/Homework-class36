'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-4-whats-the-time

1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
function addCurrentTime() {
  const todayDate = new Date();
  const second = addZero(todayDate.getSeconds());
  const minute = addZero(todayDate.getMinutes());
  const hour = addZero(todayDate.getHours());
  const currentTime = `${hour}:${minute}:${second}`;
  const timer = document.getElementById('timer');
  timer.textContent = currentTime;
}
const addZero = (num) => (num < 10 ? `0${num}` : num);

setInterval(addCurrentTime, 1000);

window.addEventListener('load', addCurrentTime);
