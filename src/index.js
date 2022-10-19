import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/refs';
import PixabayApiService from './js/fetch-pixabay';
import LoadMoreBtn from './js/load-more-btn';
import { createMarkup, resetGalleryMarkup } from './js/create-pic-markup';

const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more-btn"]',
  disable: true,
});

function onImgShow(e) {
  const target = e.target;
  e.preventDefault();

  if (target.nodeName !== 'IMG') {
    return;
  }

  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
}

loadMoreBtn.hide();

refs.searchForm.addEventListener('submit', onInputSearch);
refs.gallery.addEventListener('click', onImgShow);

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

async function onInputSearch(e) {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  pixabayApiService.query = searchQuery.value;

  resetGalleryMarkup();

  pixabayApiService.resetPage();

  loadMoreBtn.show();
  loadMoreBtn.disable();

  try {
    const { total, hits } = await pixabayApiService.fetchPicture();
    Notify.success(`Hooray! We found ${total} images.`);
    pixabayApiService.calculateTotalPage(total);
    if (hits.length === 0) {
      Notify.failure(
        `Sorry, there are no images matching on your search query ${searchQuery.value}. Please try again.`
      );
      loadMoreBtn.hide();
      return;
    } else if (pixabayApiService.showLoadMore) {
      loadMoreBtn.show();
    }

    createMarkup(hits);
    loadMoreBtn.enable();
  } catch (error) {
    alert(error.message);
  }

  // pixabayApiService.fetchPicture().then(data => {
  //   const { total } = data;
  //   Notify.success(`Hooray! We found ${total} images.`);
  //   pixabayApiService.calculateTotalPage(total);
  //   if (data.hits.length === 0) {
  //     Notify.failure(
  //       `Sorry, there are no images matching on your search query ${searchQuery.value}. Please try again.`
  //     );
  //     loadMoreBtn.hide();
  //     return;
  //   } else if (pixabayApiService.showLoadMore) {
  //     loadMoreBtn.show();
  //   }

  //   createMarkup(data.hits);
  //   loadMoreBtn.enable();
  // });
}

async function onLoadMore() {
  loadMoreBtn.disable();

  try {
    const { hits } = await pixabayApiService.fetchPicture();
    createMarkup(hits);
    if (pixabayApiService.showLoadMore) {
      loadMoreBtn.enable();
    } else {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
    }
  } catch (error) {
    Notify.failure(error);
  }
  // pixabayApiService.fetchPicture().then(picture => {
  //   createMarkup(picture.hits);
  //   if (pixabayApiService.showLoadMore) {
  //     loadMoreBtn.enable();
  //   } else {
  //     Notify.failure(
  //       "We're sorry, but you've reached the end of search results."
  //     );
  //     loadMoreBtn.hide();
  //   }
  // });
}
