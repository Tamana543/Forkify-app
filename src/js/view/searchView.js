class searchView {
  _parentEle = document.querySelector('.search');

  _cleanInput() {
    this._parentEle.querySelector('.search__field').value = '';
  }
  getQuery() {
    const query = this._parentEle.querySelector('.search__field').value;
    this._cleanInput();
    return query;
  }
  addHundlerSearch(hundler) {
    this._parentEle.addEventListener('submit', function (event) {
      event.preventDefault();
      hundler();
    });
  }
}
export default new searchView();
