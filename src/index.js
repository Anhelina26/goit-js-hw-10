// index.js

import { fetchBreeds, fetchCatByBreed } from './cat-api';

// Отримуємо посилання на HTML-елементи
const breedSelect = document.getElementById('breedSelect');
const loader = document.getElementById('loader');
const error = document.getElementById('error');
const catInfo = document.getElementById('catInfo');

// // Імпорт бібліотеки Notiflix
// import Notiflix from 'notiflix';




// Встановлюємо обробник подій для події вибору породи
breedSelect.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;

  // Показуємо завантажувач
  showLoader();

  // Викликаємо функцію для отримання даних про кота за породою
  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      // Приховуємо завантажувач
      hideLoader();

      // Відображаємо інформацію про кота
      showCatInfo(catData);
    })
    .catch((error) => {
      // Приховуємо завантажувач
      hideLoader();

      // Відображаємо повідомлення про помилку
      showError();
    });
});

// Викликаємо функцію для отримання колекції порід під час завантаження сторінки
fetchBreeds()
  .then((breeds) => {
    // Наповнюємо випадаючий список порід
    fillBreedSelect(breeds);
  })
  .catch((error) => {
    // Відображаємо повідомлення про помилку
    showError();
  });

// Функція для наповнення випадаючого списку порід
function fillBreedSelect(breeds) {
  breeds.forEach((breed) => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}

// Функція для відображення завантажувача
function showLoader() {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.style.display = 'none';
}

// Функція для приховування завантажувача
function hideLoader() {
  loader.style.display = 'none';
}

// Функція для відображення інформації про кота
function showCatInfo(catData) {
  const { breeds, url } = catData;

  // Відображаємо зображення кота
  catInfo.innerHTML = `<img class="cat_image" src="${url}" alt="Cat Image" />`;

  // Відображаємо інформацію про породу кота
  breeds.forEach((breed) => {
    const { name, description, temperament } = breed;
    const breedInfo = document.createElement('div');
    breedInfo.innerHTML = `<h3>${name}</h3>
                          <p class="cat_text"><strong>Description:</strong> ${description}</p>
                          <p><strong>Temperament:</strong> ${temperament}</p>`;
    catInfo.appendChild(breedInfo);
  });

  // Відображаємо блок інформації про кота
  catInfo.style.display = 'block';
}

// Функція для відображення повідомлення про помилку
function showError() {
  error.style.display = 'block';
  loader.style.display = 'none';
  catInfo.style.display = 'none';
}
