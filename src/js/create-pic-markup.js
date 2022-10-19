import { refs } from './refs';
export { createMarkup, resetGalleryMarkup };

function createMarkup(picture) {
  const markup = picture
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return /*html*/ `<a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </a>`;
      }
    )
    .join('');

  renderGallery(markup);
}

function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function resetGalleryMarkup() {
  refs.gallery.innerHTML = '';
}
