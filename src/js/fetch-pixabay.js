import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
const API_KEY = '30575168-17224cd1fdcc15493416f473f';

// const axios = require('axios');
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class PixabayApiService {
  #totalPage = 0;
  #perPage = 4;

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPicture() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    }).toString();

    const { data } = await axios.get(
      `?key=${API_KEY}&${searchParams}&page=${this.page}&per_page=${
        this.#perPage
      }`
    );
    this.page += 1;
    return data;
    // return fetch(
    //   `${BASE_URL}?key=${API_KEY}&${searchParams}&page=${this.page}&per_page=${
    //     this.#perPage
    //   }`
    // ).then(response => {
    //   if (!response.ok) {
    //     Notify.failure('Oops, there is no picture with that name');
    //   }
    //   this.page += 1;

    //   return response.json();
    // });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }

  calculateTotalPage(total) {
    this.#totalPage = Math.ceil(total / this.#perPage);
  }

  get showLoadMore() {
    return this.page < this.#totalPage;
  }
}
