import _throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

let data = {};

onReloadPage();

form.addEventListener('input', _throttle(onSaveFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onSaveFormInput(event) {
  data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

  data[event.target.name] = event.target.value;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (!event.target.email.value || !event.target.message.value) {
    alert('Заполните все поля!');
  }

  event.target.reset();
  console.log(data);
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function onReloadPage() {
  let savedDatas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (savedDatas) {
    data = savedDatas;
    form.email.value = data.email || '';
    form.message.value = data.message || '';
  }
}
