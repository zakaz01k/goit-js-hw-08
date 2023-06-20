import { throttle } from 'lodash.throttle';

// Функція, яка зберігає стан форми в локальному сховищі
function saveFormState() {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const feedbackState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackState));
}

// Функція, яка заповнює поля форми збереженими даними з локального сховища
function loadFormState() {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const feedbackState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (feedbackState) {
    emailInput.value = feedbackState.email;
    messageInput.value = feedbackState.message;
  }
}

// Функція, яка очищує сховище та поля форми
function clearFormState() {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
}

// Функція, яка виконується під час сабміту форми
function handleSubmit(event) {
  event.preventDefault();
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const feedbackData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  clearFormState();
  console.log(feedbackData);
}

// Встановлюємо обробники подій
document.addEventListener('DOMContentLoaded', loadFormState);

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(saveFormState, 500));
form.addEventListener('submit', handleSubmit);
