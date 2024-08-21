// Importing modules,Polli
import * as module from './module.js';
import { Module_Close_Sec } from './config.js';

import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import PaginationView from './view/PaginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { mark } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2
// L:https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
// if (module.hot) {
//   module.hot.accept();
// }
async function showRecipeEn() {
  try {
    // to implify a functionality by hash changing in page url
    const id = window.location.hash.slice(1);
    // const id = '5ed6604591c37cdc054bc886';

    if (!id) return;
    recipeView.loadSpinnerEn();

    // update resultview to selected mark
    resultView.update(module.searchRecipePage());
    // active bookmark BUG Fixed |
    bookmarksView.update(module.state.bookmarks);
    // 2) Loading recipe
    await module.recipeENg(id);
    recipeView.render(module.state.recipe);
    controllSarvingEn();
  } catch (error) {
    console.log(error);
    recipeView.errorMessageEn();
  }
}

async function searchResultEn() {
  try {
    resultView.loadSpinnerEn();
    const query = searchView.getQuery();
    if (!query) return;
    await module.searchRecipeEn(query);
    resultView.render(module.searchRecipePage());
    PaginationView.render(module.state.searchResult);
  } catch (error) {
    console.log(error);
  }
}
function controllPagination(goToPage) {
  resultView.render(module.searchRecipePage(goToPage));
  PaginationView.render(module.state.searchResult);
}
function controllSarvingEn(newServing) {
  module.updateSarving(newServing);

  // recipeView.render(module.state.recipe);
  recipeView.update(module.state.recipe);
}
function controllBookmark() {
  if (!module.state.recipe.bookmarked)
    module.addBookmarkEn(module.state.recipe);
  else module.remBookmarkEn(module.state.recipe.id);
  recipeView.update(module.state.recipe);
  // bookmark pannel

  bookmarksView.render(module.state.bookmarks);
}
function mainBookmarks() {
  bookmarksView.render(module.state.bookmarks);
}

async function addMyRecipeEn(newRecipe) {
  try {
    addRecipeView.loadSpinnerEn();

    await module.uploadMyRecipeEn(newRecipe);
    console.log(module.state.recipe);

    recipeView.render(module.state.recipe);

    bookmarksView.render(module.state.bookmarks);

    addRecipeView.errorMessageEn();
    //Change ID in URL
    // ...puchState(state , 'search MDN' , "url want to change")
    window.history.pushState(null, '', `#${module.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.windowEn();
    }, Module_Close_Sec * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.errorMessageEn(err.message);
  }
}
function init() {
  bookmarksView.addHundlerEn(mainBookmarks);
  recipeView.addHandlerRender(showRecipeEn);
  recipeView.addHundlerServies(controllSarvingEn);
  recipeView.addHundlerBookmark(controllBookmark);
  PaginationView.addHundlerPagination(controllPagination);
  searchView.addHundlerSearch(searchResultEn);
  addRecipeView.addHundlerUpload(addMyRecipeEn);
}
init();
