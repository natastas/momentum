import playList from './PlayList.js';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('.body');
let isPlay = false;
let randomNum;
let playNum = 0;
let ru = 'ru';
let en = 'en';
let language = 'en';
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const quotes = document.querySelector('.quotes');
const author = document.querySelector('.author'); 
const quoteButton = document.querySelector('.change-quote');
const playListContainer = document.querySelector('.play-list');
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const languageRu = document.querySelector('.language_ru');
const languageEn = document.querySelector('.language_en');
const music = document.querySelector('.player');
const weather = document.querySelector('.weather');
const greet = document.querySelector('.greeting-container');
const linkMe = document.querySelector('.link');
name.placeholder = '[Enter a name]';
city.placeholder = '[enter the city]';
city.value = 'Minsk';
const btnTime = document.querySelector('.btn_time');
const btnDate = document.querySelector('.btn_date');
const btnQuote = document.querySelector('.btn_quote');
const btnMusic = document.querySelector('.btn_music');
const btnWeather = document.querySelector('.btn_weather');
const btnGreeting = document.querySelector('.btn_greeting');

// translate
const greetingTranslation = {
  "night": {
    "ru": "Доброй ночи",
    "en": "Good night"
  },
  "morning": {
    "ru": "Доброе утро",
    "en": "Good morning"
  },
  "afternoon": {
    "ru": "Добрый день",
    "en": "Good afternoon"
  },
  "evening": {
    "ru": "Добрый вечер",
    "en": "Good evening"
  }
}

const weatherTranslation = {
  "ru": "ru",
  "en": "en"
}

const weatherTrnsl = {
  "wind": {
    "ru": "Скорость ветра",
    "en": "Windspeed"
  },
  "humidity": {
    "ru": "Влажность",
    "en": "Humidity"
  },
  "ms": {
    "ru": "м/с",
    "en": "m/s"
  },
}

const dateTranslation = {
  'ru': 'ru-Ru',
  'en': 'en-Br'
}

const linkTranslation = {
  'ru': 'Ануприенко Станислав',
  'en': 'Anuprienko Stanislav'
}

const holderTranslation = {
  'place': {
    "ru": "[введите город]",
    "en": "[enter the city]"
  },
  'name': {
    'ru': '[Введите имя]',
    'en': '[Enter a name]'
  }
}

const settingTranslation = {
  'time': {
    "ru": "Время",
    "en": "Time"
  },
  'date': {
    'ru': 'Дата',
    'en': 'Date'
  },
  'weather': {
    "ru": "Погода",
    "en": "Weather"
  },
  'greeting': {
    'ru': 'Приветсвие',
    'en': 'Greeting'
  },
  'language': {
    "ru": "Выберите язык",
    "en": "Language"
  },
  'music': {
    'ru': 'Музыка',
    'en': 'Music'
  },
  'quote': {
    'ru': 'Цитаты',
    'en': 'Quotes'
  }
}

// show time

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate(language);
}
showTime();

function showDate(lang) {
    const dateX = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = dateX.toLocaleDateString(dateTranslation[lang], options);
    date.textContent = currentDate;
}

// time of day

function getTimeOfDay() {
    const dates = new Date();
    const hours = dates.getHours();
    switch(hours) {
        case 0:case 1:case 2:case 3:case 4:case 5:
        return 'night';
        break;
        case 6:case 7:case 8:case 9:case 10:case 11:
        return 'morning';
        break;
        case 12:case 13:case 14:case 15:case 16:case 17:
        return 'afternoon';
        break;
        case 18:case 19:case 20:case 21:case 22:case 23:
        return 'evening';
        break;
    }
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
  }
window.addEventListener('beforeunload', setLocalStorage);

// local storage

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
      getWeather(city.value)
    } 
  }
window.addEventListener('load', getLocalStorage);

// random number

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min
}
randomNum = getRandomNum(1, 20)
// background

function setBg() {
    const timeOfDay = getTimeOfDay();
    let bgNum = randomNum.toString().padStart(2, "0");
    const image = new Image();
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    image.onload = () => {
      document.body.style.backgroundImage = `url(${url})`;
    };
    image.src = url;
  }; 
setBg()

function getSlideNext() {
  randomNum++
  if (randomNum > 20) {
    randomNum = 1;
  }
  console.log(randomNum);
  setBg()
}

function getSlidePrev() {
randomNum--
if (randomNum < 1) {
  randomNum = 20
}
  console.log(randomNum);
  setBg()
} 
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev); 

// weather

async function getWeather(town, lang) {  
  let url = '';
  if (town === 0 || town === null) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=${weatherTranslation[lang]}&appid=e52f4d744bed21e534cbfd7bf44f195c&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&lang=${weatherTranslation[lang]}&appid=e52f4d744bed21e534cbfd7bf44f195c&units=metric`;
  }
  const res = await fetch(url);
  const data = await res.json(); 
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `${weatherTrnsl['humidity'][language]}: ${data.main.humidity} %`;
  wind.textContent = `${weatherTrnsl['wind'][language]}: ${Math.round(data.wind.speed)} ${weatherTrnsl['ms'][language]}`;
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
} 
getWeather(city.value, language)
city.addEventListener('change', (e, lang) => { 
  getWeather(e.target.value, language)
}) 

  // quotes

async function getQuotes() {  
  const quotes = 'js/data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  const randomNum = Math.floor(Math.random() * 20) 
  quote.textContent = data[randomNum][language].text;
  author.textContent = data[randomNum][language].author;
   
}
getQuotes();
quoteButton.addEventListener('click', getQuotes)

// music

const audio = new Audio();
audio.src = playList[playNum].src;

function playAudio() {
  addActiveTrack (playNum)
  if (isPlay === false) {
    isPlay = true;
    audio.play();  
  } else {
    audio.pause();
    isPlay = false;
  }
}

function nextPlay() {
  if (playNum >= playList.length - 1) {
    playNum = 0;
  } else {
    ++playNum;
  }
    audio.src = playList[playNum].src;
    isPlay = false;
    play.classList.add('pause');
    playAudio();
    console.log(playNum)
}
playNext.addEventListener('click', nextPlay);

function prevPlay() {
  if (playNum <= 0) {
    playNum = playList.length - 1
  } else {
    playNum--;
  }
  audio.src = playList[playNum].src;
  isPlay = false;
  play.classList.add('pause');
  playAudio();

  console.log(playNum)  
};
playPrev.addEventListener('click', prevPlay); 

function toggleBtn() {
  if (isPlay === true) {
    play.classList.remove('pause');
  } else {
    play.classList.add('pause');
  }
}
play.addEventListener('click', toggleBtn);
play.addEventListener('click', playAudio);

playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li)
})

const tracks = document.querySelectorAll('.play-item')

tracks.forEach ((el, id) => {    
    el.addEventListener('click', () => {
      playNum = id;
      isPlay = true;
      audio.src = playList[playNum].src;
      audio.play();
      play.classList.add('pause');
      tracks.forEach(e => e.classList.remove('item-active'));
      tracks[playNum].classList.add('item-active');
    })
})

function addActiveTrack (playNum) {
  for (let i = 0; i < tracks.length; i++) {
    if (i === playNum) {
      tracks[i].classList.add('item-active');
    } else {
      tracks[i].classList.remove('item-active');
    }
  }
}

audio.addEventListener('ended', function(){
  nextPlay();
});

// translate

function showTranslationGreting (lang) {
  const day = getTimeOfDay();
  greeting.textContent = greetingTranslation[day][lang];
}
showTranslationGreting(en);

linkMe.textContent = linkTranslation['en'];
document.querySelector('.text_time').textContent = settingTranslation['time']['en']
document.querySelector('.text_date').textContent = settingTranslation['date']['en']
document.querySelector('.text_weather').textContent = settingTranslation['weather']['en']
document.querySelector('.text_language').textContent = settingTranslation['language']['en']
document.querySelector('.text_music').textContent = settingTranslation['music']['en']
document.querySelector('.text_greeting').textContent = settingTranslation['greeting']['en']
document.querySelector('.text_quotes').textContent = settingTranslation['quote']['en']

function showTranslationLink (lang) {
  linkMe.textContent = linkTranslation[lang]
  document.querySelector('.text_time').textContent = settingTranslation['time'][lang];
  document.querySelector('.text_date').textContent = settingTranslation['date'][lang];
  document.querySelector('.text_weather').textContent = settingTranslation['weather'][lang];
  document.querySelector('.text_language').textContent = settingTranslation['language'][lang];
  document.querySelector('.text_music').textContent = settingTranslation['music'][lang];
  document.querySelector('.text_greeting').textContent = settingTranslation['greeting'][lang];
  document.querySelector('.text_quotes').textContent = settingTranslation['quote'][lang];
}

function showTranslationPlace (lang) {
  name.placeholder = holderTranslation['name'][lang];
  city.placeholder = holderTranslation['place'][lang];
  
}

  languageRu.addEventListener('click', () => {
  showTranslationLink(ru)
  showTranslationGreting(ru);
  showDate(ru);
  showTranslationPlace(ru);
  getWeather(city.value, ru);
  getQuotes()
  language = 'ru';
})

languageEn.addEventListener('click', () => {
  showTranslationLink(en);
  showTranslationGreting(en);
  showDate(en);
  showTranslationPlace(en);
  getWeather(city.value, en);
  getQuotes()
  language = 'en';
}) 

// audio +
const progressBar = document.querySelector('#progress-bar');

function updateProgressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio.currentTime)));
  if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
      document.querySelector('.durationTime').innerHTML = "0:00";
  } else {
      document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio.duration)));
  }
};

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

function changeProgressBar() {
  audio.currentTime = progressBar.value;
};

progressBar.addEventListener('click', changeProgressBar)

// settings
const btnSettig = document.querySelector('.svg');
const poppup = document.querySelector('.popup')
btnSettig.addEventListener('click', () => {
  poppup.classList.toggle('popup_not')
  btnSettig.classList.toggle('svg_click')
})

let isSwitchTime = true;
 function SwitchingTime() {
  if(isSwitchTime === true) {
    btnTime.classList.add('switch-on')
    time.classList.remove('time_switch')
    isSwitchTime = false;
  } else {
    btnTime.classList.remove('switch-on')
    time.classList.add('time_switch')
    isSwitchTime = true;
  }
}
SwitchingTime()
btnTime.addEventListener('click', SwitchingTime) 

let isSwitchDate = true;
function SwitchingDate() {
  if(isSwitchDate === true) {
    btnDate.classList.add('switch-on')
    date.classList.remove('date_switch')
    isSwitchDate = false;
  } else {
    btnDate.classList.remove('switch-on')
    date.classList.add('date_switch')
    isSwitchDate = true;
  }
}
SwitchingDate()
btnDate.addEventListener('click', SwitchingDate) 

let isSwitchQuote = true;
function SwitchingQuote() {
  if(isSwitchQuote === true) {
    btnQuote.classList.add('switch-on')
    quotes.classList.remove('quotes_switch')
    isSwitchQuote = false;
  } else {
    btnQuote.classList.remove('switch-on')
    quotes.classList.add('quotes_switch')
    isSwitchQuote = true;
  }
}
SwitchingQuote()
btnQuote.addEventListener('click', SwitchingQuote)  

let isSwitchMusic = true;
function SwitchingMusic() {
  if(isSwitchMusic === true) {
    btnMusic.classList.add('switch-on')
    music.classList.remove('player_switch')
    isSwitchMusic = false;
  } else {
    btnMusic.classList.remove('switch-on')
    music.classList.add('player_switch')
    isSwitchMusic = true;
  }
}
SwitchingMusic()
btnMusic.addEventListener('click', SwitchingMusic)  

let isSwitchWeather = true;
function SwitchingWeather() {
  if(isSwitchWeather === true) {
    btnWeather.classList.add('switch-on')
    weather.classList.remove('weather_switch')
    isSwitchWeather = false;
  } else {
    btnWeather.classList.remove('switch-on')
    weather.classList.add('weather_switch')
    isSwitchWeather = true;
  }
}
SwitchingWeather()
btnWeather.addEventListener('click', SwitchingWeather)  

let isSwitchGreeting = true;
function SwitchingGreeting() {
  if(isSwitchGreeting === true) {
    btnGreeting.classList.add('switch-on')
    greet.classList.remove('greeting-container_switch')
    isSwitchGreeting = false;
  } else {
    btnGreeting.classList.remove('switch-on')
    greet.classList.add('greeting-container_switch')
    isSwitchGreeting = true;
  }
}
SwitchingGreeting()
btnGreeting.addEventListener('click', SwitchingGreeting)  