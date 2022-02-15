import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, '0');

let selectedDate = null;
const TIMEOUT_DELAY = 1000;

const refs = {
  inputSelectedDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysQuantity: document.querySelector('[data-days]'),
  hoursQuantity: document.querySelector('[data-hours]'),
  minutesQuantity: document.querySelector('[data-minutes]'),
  secondsQuantity: document.querySelector('[data-seconds]'),
};
refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] < new Date()
      ? Notify.failure('Please choose a date in the future')
      : refs.startBtn.removeAttribute('disabled'),
      (selectedDate = selectedDates[0]);
  },
};

const onStartTimer = () => {
  const timerId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = selectedDate - currentDate;

    const deltaMs = convertMs(deltaTime);

    refs.daysQuantity.textContent = addLeadingZero(deltaMs.days);
    refs.hoursQuantity.textContent = addLeadingZero(deltaMs.hours);
    refs.minutesQuantity.textContent = addLeadingZero(deltaMs.minutes);
    refs.secondsQuantity.textContent = addLeadingZero(deltaMs.seconds);

    refs.inputSelectedDate.setAttribute('disabled', true);
    refs.startBtn.setAttribute('disabled', true);

    if (deltaTime <= TIMEOUT_DELAY) {
      refs.inputSelectedDate.removeAttribute('disabled');
      clearInterval(timerId);
    }
  }, TIMEOUT_DELAY);
};

flatpickr(refs.inputSelectedDate, options);
refs.startBtn.addEventListener('click', onStartTimer);
