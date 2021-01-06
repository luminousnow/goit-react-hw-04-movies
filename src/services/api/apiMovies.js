const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '75eda82d692cd448b965956ce8ebf68c';

//АРІ запит - Список трендів
export function apiTrending() {
  return fetch(`${BASE_URL}trending/all/day?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error(`Хмм... Популярних фільмів не знайдено`));
    },
  );
}

//АРІ запит - Пошук фільмів по ключовому слову
export function apiQuerySearching(query) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Хмм... По запиту фільмів не знайдено`));
  });
}

//АРІ запит - Деталі одного фільму
// movie/89844?api_key=75eda82d692cd448b965956ce8ebf68c
export function apiMovieDetails(movieId) {
  return fetch(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error(`Хмм... По запиту фільмів не знайдено`));
    },
  );
}

//АРІ запит - Акторський склад одного фільму
export function apiCast(movieId) {
  return fetch(`${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error(`Хмм... По запиту фільмів не знайдено`));
    },
  );
}

//АРІ запит - Відгуки одного фільму
export function apiReviews(movieId) {
  return fetch(`${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error(`Хмм... По запиту фільмів не знайдено`));
    },
  );
}
