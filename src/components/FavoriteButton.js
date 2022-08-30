import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';

function FavoriteButton() {
  const { pathname } = useLocation();
  const { params: { id } } = useRouteMatch();
  const { recipeDetails } = useContext(AppContext);
  const type = pathname.includes('drinks') ? 'drinks' : 'meals';

  const [isFavorited, setFavorited] = useState(false);

  const setFavoriteState = useCallback(() => {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = favoriteRecipesStorage
    && favoriteRecipesStorage.some((recipe) => recipe.id === id);
    setFavorited(isFavorite);
  }, [id]);

  useEffect(() => {
    setFavoriteState();
  }, []);

  const addToFavorites = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(recipeDetails);
    const newFavoriteRecipeObj = {
      id,
      type: type === 'drinks' ? 'drink' : 'food',
      alcoholicOrNot: recipeDetails.strAlcoholic ? recipeDetails.strAlcoholic : '',

      nationality: type === 'drinks' ? '' : recipeDetails.strArea,
      category: recipeDetails.strCategory,
      name: type === 'drinks' ? recipeDetails.strDrink : recipeDetails.strMeal,
      image: type === 'drinks' ? recipeDetails.strDrinkThumb : recipeDetails.strMealThumb,
    };
    const favoriteRecipesNewArray = favoriteRecipes
      ? [...favoriteRecipes, newFavoriteRecipeObj]
      : [newFavoriteRecipeObj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesNewArray));
    setFavorited(true);
  };

  const removeFromFavorites = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipesNewArray = favoriteRecipes && favoriteRecipes
      .filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesNewArray));
    setFavorited(false);
  };

  return (
    <Button
      variant="light"
      onClick={ isFavorited ? () => removeFromFavorites() : () => addToFavorites() }
    >
      {isFavorited
        ? (
          <img
            src={ blackHeartIcon }
            alt="Favorite Icon"
            data-testid="favorite-btn"
          />
        )
        : (
          <img
            src={ whiteHeartIcon }
            alt="Favorite Icon"
            data-testid="favorite-btn"
          />)}
    </Button>
  );
}

export default FavoriteButton;
