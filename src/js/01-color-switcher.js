function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let id = null;

function onStartBtnClick() {
  id = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.setAttribute('disabled', true);
}

function onStopBtnClick() {
  clearInterval(id);
  refs.startBtn.removeAttribute('disabled');
}
