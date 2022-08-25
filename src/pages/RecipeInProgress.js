import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

/*
{
    cocktails: {
        id-da-bebida: [lista-de-ingredientes-utilizados],
        ...
    },
    meals: {
        id-da-comida: [lista-de-ingredientes-utilizados],
        ...
    }
}
*/

const ingredients = [
  'strIngredient1',
  'strIngredient2',
  'strIngredient3',
  'strIngredient4',
  'strIngredient5',
  'strIngredient6',
  'strIngredient7',
  'strIngredient8',
  'strIngredient9',
  'strIngredient10',
  'strIngredient11',
  'strIngredient12',
  'strIngredient13',
  'strIngredient14',
  'strIngredient15',
  'strIngredient16',
  'strIngredient17',
  'strIngredient18',
  'strIngredient19',
  'strIngredient20',
];

export default function RecipeInProgress({ match: { params: { id } } }) {
  // const [ingredients, setIngredients] = useState([]);
  const { meals, drinks } = useContext(AppContext);
  const [recipe, setRecipe] = useState({});

  // useEffect(() => {
  //   const ingredientsLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (ingredientsLocalStorage) {
  //     const mealIngredients = ingredientsLocalStorage.meals[id];
  //     const drinkIngredients = ingredientsLocalStorage.cocktails[id];
  //     if (mealIngredients) setIngredients(mealIngredients);
  //     else setIngredients(drinkIngredients);
  //   }
  //   console.log(ingredientsLocalStorage);
  // }, []);

  useEffect(() => {
    const mealRecipe = meals.find((m) => m.idMeal === id);
    const drinkRecipe = drinks.find((d) => d.idDrink === id);
    if (mealRecipe) setRecipe(mealRecipe);
    if (drinkRecipe) setRecipe(drinkRecipe);
  },
  [meals, drinks]);

  const renderInProgressRecipe = (rec) => {
    if (!rec || rec === {}) return '';
    return (
      <div>
        <h1 data-testid="recipe-title">{rec.strMeal ? rec.strMeal : rec.strDrink}</h1>
        <img
          src={ rec.strMealThumb ? rec.strMealThumb : rec.strDrinkThumb }
          alt={ rec.strMeal ? rec.strMeal : rec.strDrink }
          data-testid="recipe-photo"
        />
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        <h3 data-testid="recipe-category">{rec.strCategory}</h3>
        <ol>
          {/* {ingredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-step` }>
              <label
                htmlFor={ ingredient }
              >
                {ingredient}
                {' '}
                <input type="checkbox" id={ ingredient } />
              </label>
            </li>
          ))} */}
          {ingredients
            .filter((ingredient) => rec[ingredient] !== ''
              && rec[ingredient])
            .map((ingredient, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-step` }>
                <label
                  htmlFor={ ingredient }
                >
                  {rec[ingredient]}
                  {' '}
                  <input type="checkbox" id={ ingredient } />
                </label>
              </li>
            ))}
        </ol>
        <p data-testid="instructions">{rec.strInstructions}</p>
        <button type="button" data-testid="finish-recipe-btn">Finish</button>
      </div>
    );
  };

  return (
    <div>
      {renderInProgressRecipe(recipe)}
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
