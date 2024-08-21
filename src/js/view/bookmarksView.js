import View from './view.js';
import previewView from './previewView.js';

class bookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHundlerEn(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this.data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarkView();
