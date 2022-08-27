import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
// import whiteIcon from '../images/whiteHeartIcon.svg';
// import blackIcon from '../images/blackHeartIcon.svg';

const ingredientsStrings = [
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

const inProgressRecipesDefault = {
  cocktails: {
    // id-da-bebida: [lista-de-ingredientes-utilizados],
  },
  meals: {
    // id-da-comida: [lista-de-ingredientes-utilizados],
  },
};

export default function RecipeInProgress({ match: { params: { id } }, location }) {
  const [recipe, setRecipe] = useState({});
  const [inProgressRecipes, setInProgressRecipes] = useState(inProgressRecipesDefault);
  const [recipeType, setRecipeType] = useState('');
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // const [favIcon, setFavIcon] = useState(whiteIcon);

  useEffect(() => {
    if (location.pathname.includes('drinks')) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${(id)}`)
        .then((response) => response.json())
        .then((json) => {
          setRecipe(json.drinks[0]);
          setRecipeType('cocktails');
        });
    }
    if (location.pathname.includes('foods')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${(id)}`)
        .then((response) => response.json())
        .then((json) => {
          setRecipe(json.meals[0]);
          setRecipeType('meals');
        });
    }
    const previousRecipes = JSON.parse(localStorage.getItem('InProgressRecipes'));
    if (previousRecipes) setInProgressRecipes(previousRecipes);
    // const previousFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // if (previousFavoriteRecipes) {
    //   setFavoriteRecipes(previousFavoriteRecipes);
    //   if (favoriteRecipes.includes(recipe)) setFavIcon(blackIcon);
    // }
    // setFavIcon(whiteIcon);
  }, []);

  const isIngredientChecked = (ingredient) => inProgressRecipes[recipeType][id]
    .includes(ingredient);

  const checkIngredient = (ingredient) => {
    if (!inProgressRecipes[recipeType][id]) {
      setInProgressRecipes({
        ...inProgressRecipes,
        [recipeType]: {
          [id]: [ingredient],
        },
      });
    } else {
      setInProgressRecipes({
        ...inProgressRecipes,
        [recipeType]: {
          [id]: [...inProgressRecipes[recipeType][id], ingredient],
        },
      });
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  // const favorite = () => {
  //   if (favIcon === whiteIcon) setFavIcon(blackIcon);
  //   else setFavIcon(whiteIcon);
  //   const newFavoriteRecipes = [...favoriteRecipes, recipe];
  //   setFavoriteRecipes(newFavoriteRecipes);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  // };

  return (
    <div>
      {recipe && (
        <div>
          <h1
            data-testid="recipe-title"
          >
            {recipe.strMeal ? recipe.strMeal : recipe.strDrink}
          </h1>
          <img
            src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ recipe.strMeal ? recipe.strMeal : recipe.strDrink }
            data-testid="recipe-photo"
          />
          <button
            type="button"
            data-testid="share-btn"
            onClick={ ({ target }) => {
              target.innerHTML = 'Link copied!';
              copy(`http://localhost:3000${location.pathname}`.replace('/in-progress', ''));
            } }
          >
            <img
              alt="Share Button"
              src={ shareIcon }
            />
          </button>
          <button
            type="button"
            // onClick={ favorite }
          >
            <img
              data-testid="favorite-btn"
              alt="Favorite button"
              // src={ favIcon }
            />
          </button>
          <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
          <ol>
            {ingredientsStrings
              .filter((ingredient) => recipe[ingredient] !== ''
            && recipe[ingredient])
              .map((ingredient, index) => (
                <li key={ index } data-testid={ `${index}-ingredient-step` }>
                  <label
                    htmlFor={ ingredient }
                  >
                    {recipe[ingredient]}
                    {' '}
                    <input
                      type="checkbox"
                      id={ ingredient }
                      defaultChecked={ () => isIngredientChecked(recipe[ingredient]) }
                      onChange={ () => checkIngredient(recipe[ingredient]) }
                    />
                  </label>
                </li>
              ))}
          </ol>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">Finish</button>
        </div>
      )}
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
