import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.getElementById('breedSelect');
const loader = document.getElementById('loader');
const error = document.getElementById('error');
const catInfo = document.getElementById('catInfo');



breedSelect.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;

  showLoader();

 
  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      hideLoader();
      showCatInfo(catData);
    })
    .catch((error) => {
      hideLoader();
      showError();
    });
});

fetchBreeds()
  .then((breeds) => {
    fillBreedSelect(breeds);
    hideError(); 
  })
  .catch((error) => {
    showError();
  });

function fillBreedSelect(breeds) {
  breeds.forEach((breed) => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}

function showLoader() {
  breedSelect.style.display = 'none';
  catInfo.style.display = 'none';
  loader.style.display = 'block';
  error.style.display = 'none';
 

}

function hideLoader() {
  loader.style.display = 'none';
  catInfo.style.display = 'block';
  breedSelect.style.display = 'block';

}

function showCatInfo(catData) {
  const { breeds, url } = catData;
  catInfo.innerHTML = `<img class="cat_image" src="${url}" alt="Cat Image" />`;

  const breedInfoHTML = breeds.map(({ name, description, temperament }) => `
    <div>
      <h3>${name}</h3>
      <p class="cat_text"><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    </div>
  `).join("");

  catInfo.innerHTML += breedInfoHTML;
  catInfo.style.display = 'block';
} 

function showError() {
  error.style.display = 'block';
  loader.style.display = 'none';
  catInfo.style.display = 'none';
}

function hideError() {
  error.style.display = 'none';
}
