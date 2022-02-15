const refs = {
  bodyElem: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const TIMEOUT_DELAY = 1000;
let timeoutId = null;

let toggle = refs.stopBtn.setAttribute('disabled', true);

const onStartButton = () => {
  timeoutId = setInterval(() => {
    refs.bodyElem.style.backgroundColor = getRandomHexColor();
  }, TIMEOUT_DELAY);
  toggleAction();
};

const onStopButton = () => {
  clearInterval(timeoutId);
  toggleAction();
};

const toggleAction = () => {
  if ((toggle = !toggle)) {
    refs.stopBtn.removeAttribute('disabled');
    refs.startBtn.setAttribute('disabled', true);
  } else {
    refs.stopBtn.setAttribute('disabled', true);
    refs.startBtn.removeAttribute('disabled');
  }
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', onStartButton);
refs.stopBtn.addEventListener('click', onStopButton);
