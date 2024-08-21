import icon from 'url:../../img/icons.svg';
export default class View {
  data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorMessageEn();
    this.data = data;
    const morkup = this._generateMarkup();
    if (!render) return morkup;
    this._clearContainer();
    this._parentEl.insertAdjacentHTML('afterbegin', morkup);
  }
  // to only change text elements in page
  update(data) {
    this.data = data;

    const newMorkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMorkup);
    const currentEl = Array.from(this._parentEl.querySelectorAll('*')); // Any BUG check here
    const newELement = Array.from(newDom.querySelectorAll('*'));

    newELement.forEach((newEl, i) => {
      const curEl = currentEl[i];
      // to check the defference happend between past and new DOM

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // to impliment the data changing
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  _clearContainer() {
    this._parentEl.innerHTML = '';
  }

  loadSpinnerEn() {
    const HTML = `
      <div class="spinner">
              <svg>
                <use href="${icon}#icon-loader"></use>
              </svg>
            </div>
      `;
    this._clearContainer();
    this._parentEl.insertAdjacentHTML('afterbegin', HTML);
  }
  errorMessageEn(message = this._errorMessage) {
    const HTML = `
        <div class="error_two">
                <div>
                  <svg>
                    <use href="${icon}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}!</p>
              </div>
        `;
    this._clearContainer();
    this._parentEl.insertAdjacentHTML('afterbegin', HTML);
  }
}
