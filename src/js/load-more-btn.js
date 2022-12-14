export default class LoadMoreBtn {
  constructor({ selector, disable = true }) {
    this.refs = this.getRefs(selector);
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    refs.spinner = refs.button.querySelector('.spinner-border');

    return refs;
  }

  enable() {
    this.refs.button.disable = false;
    this.refs.label.textContent = 'Load more';
    this.refs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.refs.button.disable = true;
    this.refs.label.textContent = 'Loading ...';
    this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
