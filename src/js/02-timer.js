import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const DELAY_TIME = 1000;

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      refs.startBtn.disabled = true;
      return Notiflix.Notify.failure(`Please choose a date in the future`);
    }
    refs.startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const addLeadingZero = value => String(value).padStart(2, '0');

function makeData({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function onStartBtnClick() {
  refs.startBtn.disabled = true;

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = new Date(refs.inputEl.value) - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    makeData({ days, hours, minutes, seconds });

    if (
      days === '00' &&
      hours === '00' &&
      minutes === '00' &&
      seconds === '00'
    ) {
      clearInterval(intervalId);
    }
  }, DELAY_TIME);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
