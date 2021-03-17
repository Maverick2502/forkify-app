import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable' ////for polyfilling the rest
import 'regenerator-runtime/runtime' //for polyfilling async/await

const recipeContainer = document.querySelector('.recipe');

// svgSprite.config.js

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
  } catch (error) {
    console.error(error);
  }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipes))
// the same as doing the above one
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);