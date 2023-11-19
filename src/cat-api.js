// cat-api.js

import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_kH0XFWwWfZ60KmXVwKY86Ww6bKz7ErzFw6Z7BS29B3xj3TJrTyDqX31TRgKrz4uR";

const BASE_URL_BREEDS = "https://api.thecatapi.com/v1/breeds";
const BASE_URL_CAT = "https://api.thecatapi.com/v1/images/search";

export function fetchBreeds() {
  return axios
    .get(BASE_URL_BREEDS)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching breeds:", error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL_CAT}?breed_ids=${breedId}`;

  return axios
    .get(url)
    .then((response) => {
      const catData = response.data[0];
      return catData;
    })
    .catch((error) => {
      console.error("Error fetching cat by breed:", error);
      throw error;
    });
}
