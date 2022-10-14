import { refs } from './refs';

export default function createMarkup(picture) {
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
        return /*html*/ `<a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="photo-card">
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
  </div>`;
      }
    )
    .join('');

  renderGallery(markup);
}

console.log(refs.gallery);
function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
