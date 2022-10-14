import { refs } from './js/refs';
// import { fetchPicture } from './js/fetch-pixabay';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayApiService from './js/fetch-pixabay';
import createMarkup from './js/create-pic-markup';

refs.searchForm.addEventListener('submit', onInputSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const pixabayApiService = new PixabayApiService();

export function onInputSearch(e) {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  pixabayApiService.query = searchQuery.value;

  pixabayApiService.fetchPicture().then(picture => {
    if (picture.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      createMarkup(picture.hits);
    }
  });
}

function onLoadMore() {
  pixabayApiService.fetchPicture().then(picture => {
    createMarkup(picture.hits);
  });
}
