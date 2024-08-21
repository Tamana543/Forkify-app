import View from './view.js';
import icon from 'url:../../img/icons.svg';
class previewView extends View {
  _parentEl = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
            <a class="preview__link ${
              this.data.id === id ? 'preview__link--active' : ''
            }" href="#${this.data.id}">
              <figure class="preview__fig">
                <img src="${this.data.Image}" alt="${this.data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this.data.title}</h4>
                <p class="preview__publisher">${this.data.publisher}</p>
                <div class="preview__user-generated ${
                  this.data.key ? '' : 'hidden'
                }">
                  <svg>
                    <use href="${icon}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
  }
}

export default new previewView();
