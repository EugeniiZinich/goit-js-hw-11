import { Notify } from 'notiflix/build/notiflix-notify-aio';
const API_KEY = '30575168-17224cd1fdcc15493416f473f';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPicture() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: '40',
    }).toString();

    return fetch(
      `${BASE_URL}?key=${API_KEY}&${searchParams}&page=${this.page}`
    ).then(response => {
      if (!response.ok) {
        Notify.failure('Oops, there is no picture with that name');
      }
      this.page += 1;
      return response.json();
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// export function fetchPicture(name) {
//   const searchParams = new URLSearchParams({
//     q: name,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//     per_page: '40',
//   }).toString();

//   return fetch(`${BASE_URL}?key=${API_KEY}&${searchParams}&page=${page}`).then(
//     response => {
//       page += 1;
//       console.log(response);
//       if (!response.ok) {
//         Notify.failure('Oops, there is no picture with that name');
//       }
//       return response.json();
//     }
//   );
// }
