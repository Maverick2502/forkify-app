import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable' ////for polyfilling the rest
import 'regenerator-runtime/runtime' //for polyfilling async/await

console.log('TEST');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)
    
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe 
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe) //alt approach
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};
controlSearchResults();

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();