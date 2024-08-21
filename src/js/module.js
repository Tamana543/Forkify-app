import { async } from 'regenerator-runtime';
import { API_URL, STR_PER_PAGE, KEY } from './config.js';
// import { JSON_HUND, Send_JSON } from './helper.js';
import { AJAX } from './helper.js';
export const state = {
  recipe: {},
  searchResult: {
    result: [],
    query: '',
    page: 1,
    resultsPerPage: STR_PER_PAGE,
  },
  bookmarks: [],
};
const recipeMakerEn = function (data) {
  const { recipe } = data.data;
  console.log(data);
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    Image: recipe.image_url,
    serving: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const recipeENg = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = recipeMakerEn(data);
    console.log(data);
    // To make a reciepe be bookmarked all the time
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function searchRecipeEn(query) {
  try {
    state.searchResult.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.searchResult.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        Image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.searchResult.page = 1;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export function searchRecipePage(page = state.searchResult.page) {
  state.searchResult.page = page;

  const start = (page - 1) * state.searchResult.resultsPerPage;
  const end = page * state.searchResult.resultsPerPage;

  return state.searchResult.result.slice(start, end);
}
export function updateSarving(newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.serving;
  });
  state.recipe.servings = newServing;
}
function localSavingBookmarks() {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
}
export function addBookmarkEn(recipe) {
  // to push bookmark in reciepe
  state.bookmarks.push(recipe);

  // mork current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  localSavingBookmarks();
}
export function remBookmarkEn(id) {
  // Deleting bookmark
  const index = state.bookmarks.findIndex(el => el.id);
  state.bookmarks.splice(index, 1);

  // mark cur recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  localSavingBookmarks();
}
function init() {
  const data = localStorage.getItem('bookmark');
  if (data) state.bookmarks = JSON.parse(data);
}
init();
// uploading a recipe by user
export async function uploadMyRecipeEn(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(ele => ele[0].startsWith('ingredient') && ele[1] !== '')
      .map(ing => {
        const ingArray = ing[1].split(',').map(el => el.trim());
        // const ingArray = ing[1].replaceAll(' ', '').split(',');
        if (ingArray.length !== 3) {
          throw new Error(
            'Wrong Ingridients Format, Please try to follow main order ;)'
          );
        }
        const [quantity, unit, description] = ingArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const reciepe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, reciepe);
    console.log(data);
    state.recipe = recipeMakerEn(data);
    addBookmarkEn(state.recipe);
  } catch (err) {
    throw err;
  }
}
// devloping function CLEAR THEN
function clearLocal() {
  localStorage.clear('bookmark');
}
// 11:47
