// import hasInstance from 'core-js/fn/function/has-instance';
import View from './view.js';
import icon from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHundlerPagination(hundler) {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      hundler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this.data.page;
    const pageNum = Math.ceil(
      this.data.result.length / this.data.resultsPerPage
    );

    // first page
    if (curPage === 1 && pageNum > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    // midle Page
    if (curPage < pageNum) {
      return `
      <button data-goto="${
        curPage - 1
      }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }"  class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    // last Page
    if (curPage === pageNum && pageNum > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
      `;
    }
    //     only one page exist
    return ' ';
  }
}

export default new PaginationView();
