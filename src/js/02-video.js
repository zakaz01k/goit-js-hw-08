import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

// Отримання часу відтворення з локального сховища
const currentTime = localStorage.getItem('videoplayer-current-time');

// Встановлення часу відтворення, якщо він є збереженим
if (currentTime) {
  player.setCurrentTime(parseFloat(currentTime));
}

// Функція для оновлення часу відтворення у локальному сховищі
const updateCurrentTime = throttle(time => {
  localStorage.setItem('videoplayer-current-time', time.toFixed(2));
}, 1000);

// Відстеження події timeupdate і оновлення часу відтворення
player.on('timeupdate', data => {
  updateCurrentTime(data.seconds);
});
