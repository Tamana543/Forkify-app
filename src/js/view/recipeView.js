import icon from 'url:../../img/icons.svg';
import View from './view.js';
import { Fraction } from 'fractional'; //BUG
class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'Ops We can not find the reciepe';
  _message = '';
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(el => window.addEventListener(el, handler));
  }
  addHundlerServies(handler) {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--update-servings');
      // console.log(btn);
      if (!btn) return;
      const { update } = btn.dataset;
      if (+update > 0) handler(+update);
      // handler(2);
    });
  }
  addHundlerBookmark(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
           <img src="${this.data.Image}" alt="${
      this.data.title
    }" class="recipe__img" />
           <h1 class="recipe__title">
             <span>${this.data.title}</span>
           </h1>
         </figure>
     <div class="recipe__details">
           <div class="recipe__info">
             <svg class="recipe__info-icon">
               <use href="${icon}#icon-clock"></use>
             </svg>
             <span class="recipe__info-data recipe__info-data--minutes">${
               this.data.cookingTime
             }</span>
             <span class="recipe__info-text">minutes</span>
           </div>
           <div class="recipe__info">
             <svg class="recipe__info-icon">
               <use href="${icon}#icon-users"></use>
             </svg>
             <span class="recipe__info-data recipe__info-data--people">${
               this.data.serving
             }</span>
             <span class="recipe__info-text">servings</span>
 
             <div class="recipe__info-buttons">
               <button class="btn--tiny btn--update-servings" data-update="${this
                 .data.serving--}">
                 <svg>
                   <use href="${icon}#icon-minus-circle"></use>
                 </svg>
               </button>
               <button class="btn--tiny btn--update-servings" data-update="${this
                 .data.serving++}">
                 <svg>
                  <use href="${icon}#icon-plus-circle"></use>
                 
                 </svg>
               </button>
             </div>
           </div>
 
           <div class="recipe__user-generated ${this.data.key ? '' : 'hidden'}">
             <svg>
               <use href="${icon}#icon-user"></use>
             </svg>
           </div>
           <button class="btn--round btn--bookmark">
             <svg class="">
               <use href="${icon}#icon-bookmark${
      this.data.bookmarked ? '-fill' : ''
    }"></use>
             </svg>
           </button>
         </div>
 
         <div class="recipe__ingredients">
           <h2 class="heading--2">Recipe ingredients</h2>
           <ul class="recipe__ingredient-list">
             ${this.data.ingredients
               .map(ing => {
                 return `
               <li class="recipe__ingredient">
               <svg class="recipe__icon">
                 <use href="${icon}#icon-check"></use>
               </svg>
               <div class="recipe__quantity">${
                 ing.quantity ? new Fraction(ing.quantity).toString() : ''
               }</div>
               <div class="recipe__description">
                 <span class="recipe__unit">${ing.unit}</span>
                 ${ing.description}
               </div>
             </li>
               `;
               })
               .join('')}
             
           </ul>
         </div>
 
         <div class="recipe__directions">
           <h2 class="heading--2">How to cook it</h2>
           <p class="recipe__directions-text">
             This recipe was carefully designed and tested by
             <span class="recipe__publisher">${
               this.data.publisher
             }</span>. Please check out
             directions at their website.
           </p>
           <a
             class="btn--small recipe__btn"
             href="${this.data.sourceUrl}"
             target="_blank"
           >
             <span>Directions</span>
             <svg class="search__icon">
               <use href="${icon}#icon-arrow-right"></use>
             </svg>
           </a>
         </div>
     `;
  }
  errorMessageEn(message = this._errorMessage) {
    const HTML = `
     
     <div id="error-box">
        
        <div class="face2">
          <div class="eye"></div>
          <div class="eye right"></div>
          <div class="mouth sad"></div>
        </div>
        <div class="shadow move"></div>
        <div class="message">
          <h1 class="alert">Error!</h1>
          <p>${message}</p>
        </div>
      </div>
      
    `;
    this._clearContainer();
    this._parentEl.insertAdjacentHTML('afterbegin', HTML);
  }
}
export default new RecipeView();
