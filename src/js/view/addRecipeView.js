import View from './view.js';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _errorMessage =
    'Recipe Uploaded Successfully :), Check bookmarks pannel to chick your recipe ';
  _openWindowBtn = document.querySelector('.nav__btn--add-recipe');
  _closeWindowBtn = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  constructor() {
    super();
    this._addEventOpenbtn();
    this._addEventClosebtn();
  }
  windowEn() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addEventOpenbtn() {
    this._openWindowBtn.addEventListener('click', this.windowEn.bind(this));
  }
  _addEventClosebtn() {
    this._closeWindowBtn.addEventListener('click', this.windowEn.bind(this));
    this._overlay.addEventListener('click', this.windowEn.bind(this));
  }
  addHundlerUpload(hundler) {
    this._parentEl.addEventListener('submit', function (event) {
      event.preventDefault();
      // FormData(element which is a form )
      const arrData = [...new FormData(this)];
      const data = Object.fromEntries(arrData);
      hundler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
