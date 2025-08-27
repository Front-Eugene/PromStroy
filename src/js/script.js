// МОБИЛЬНОЕ МЕНЮ 

const menuBtn = document.querySelector('.menu-btn');
const navUl = document.querySelector('.nav-ul');
const navLinks = document.querySelectorAll('.nav-ul a');

function toggleMenu() {
  menuBtn.classList.toggle('active');
  navUl.classList.toggle('active');
}

// Клик по кнопке меню
menuBtn.addEventListener('click', toggleMenu);

// Клик по любой ссылке в меню
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Если меню открыто — закрываем
    if (navUl.classList.contains('active')) {
      toggleMenu();
    }
  });
});



const MIN_PRELOADER_TIME = 1500; // минимальное время показа (мс)
const FADE_DURATION = 500;       // длительность анимации исчезновения (мс)
const preloader = document.getElementById('preloader');

// 1. Промис, который выполнится через 2 секунды
const timerPromise = new Promise(resolve => setTimeout(resolve, MIN_PRELOADER_TIME));

// 2. Промис, который выполнится при полной загрузке страницы
const loadPromise = new Promise(resolve => window.onload = resolve);

// 3. Ожидаем оба условия
Promise.all([timerPromise, loadPromise]).then(() => {
  preloader.classList.add('hide'); // плавное исчезновение
  setTimeout(() => {
    preloader.style.display = 'none'; // убираем из DOM после анимации
    document.body.classList.remove('preloader-active'); // возвращаем прокрутку
  }, FADE_DURATION);
});


// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 8px;
        background: linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(205, 205, 205) 100%);
        z-index: 900;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Sticky header shadow
    const header = document.querySelector('header');
    function updateHeaderShadow() {
      if (window.scrollY > 8) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
    updateHeaderShadow();
    window.addEventListener('scroll', updateHeaderShadow);
});

// АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 120); // задержка для каскада
      obs.unobserve(entry.target); // анимация только один раз
    }
  });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));

// Создание элементов галереи
const images = document.querySelectorAll('.gallery');

const sliderOverlay = document.createElement('div');
sliderOverlay.className = 'gallery-slider-overlay';

const sliderImage = document.createElement('img');
sliderImage.className = 'gallery-slider-image';

const closeButton = document.createElement('button');
closeButton.className = 'gallery-slider-close';
closeButton.innerHTML = `
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <line x1="8" y1="8" x2="24" y2="24" stroke="#bfa14a" stroke-width="3" stroke-linecap="round"/>
    <line x1="24" y1="8" x2="8" y2="24" stroke="#bfa14a" stroke-width="3" stroke-linecap="round"/>
  </svg>
`;

const prevButton = document.createElement('button');
prevButton.className = 'gallery-slider-prev';
prevButton.innerHTML = `
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <polyline points="20,8 12,16 20,24" fill="none" stroke="#bfa14a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const nextButton = document.createElement('button');
nextButton.className = 'gallery-slider-next';
nextButton.innerHTML = `
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <polyline points="12,8 20,16 12,24" fill="none" stroke="#bfa14a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

sliderOverlay.appendChild(sliderImage);
sliderOverlay.appendChild(closeButton);
sliderOverlay.appendChild(prevButton);
sliderOverlay.appendChild(nextButton);
document.body.appendChild(sliderOverlay);

let currentIndex = 0;

function showImage(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  currentIndex = index;
  sliderImage.src = images[currentIndex].src;
  sliderOverlay.classList.add('active');
}

images.forEach((img, idx) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => showImage(idx));
});

closeButton.addEventListener('click', () => {
  sliderOverlay.classList.remove('active');
});

prevButton.addEventListener('click', () => {
  showImage(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  showImage(currentIndex + 1);
});



