const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '75eda82d692cd448b965956ce8ebf68c';

//АРІ запит - Список трендів
export function apiTrending(page) {
  return fetch(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Популярних фільмів не знайдено`));
  });
}

//АРІ запит - Пошук фільмів по ключовому слову
export function apiQuerySearching(query, page) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`По ключовому слову нічого не знайдено`));
  });
}

//АРІ запит - Деталі одного фільму
export function apiMovieDetails(movieId) {
  return fetch(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error(`Деталей по ІД не знайдено`));
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

      return Promise.reject(new Error(`Авторського складу по ІД не знайдено`));
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

      return Promise.reject(new Error(`Відгуків по ІД не знайдено`));
    },
  );
}
