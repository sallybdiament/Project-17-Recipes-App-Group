import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { string } from 'prop-types';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import ingredientsAndMeasuresList from '../helpers/detailsDataNormalizer';
import { fetchRecipeDetails, fetchRecommendedRecipes } from '../services/fetchDetailsAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipeDetails.css';
import '@splidejs/react-splide/css';

const copy = require('clipboard-copy');

export default function RecipeDetails({ type }) {
  const { params: { id }, url } = useRouteMatch();
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [startBtnIsEnable, setStartBtnIsEnable] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);
  const [show, setShow] = useState(false);
  const [isFavorited, setFavorited] = useState(false);
  const target = useRef(null);

  const imagePlaceHolder = type === 'drinks' ? 'strDrinkThumb' : 'strMealThumb';
  const namePlaceHolder = type === 'drinks' ? 'strDrink' : 'strMeal';

  const recommendedImage = type === 'drinks' ? 'strMealThumb' : 'strDrinkThumb';
  const recommendedName = type === 'drinks' ? 'strMeal' : 'strDrink';

  const getRecipeDetails = useCallback(async () => {
    const detailsData = await fetchRecipeDetails(type, id);
    const ingredientsList = ingredientsAndMeasuresList(detailsData, 'strIngredient');
    const measuresList = ingredientsAndMeasuresList(detailsData, 'strMeasure');

    setIngredients(ingredientsList);
    setMeasures(measuresList);
    setRecipeDetails(detailsData);
  }, [type, id]);

  const getRecommendedRecipes = useCallback(async () => {
    const recommendedRecipesList = await fetchRecommendedRecipes(type);
    setRecommendedRecipes(recommendedRecipesList);
  }, [type]);

  const startBtnIsEnableFunc = useCallback(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipeIsDone = doneRecipes && doneRecipes
      .some((recipe) => recipe.id === id);
    setStartBtnIsEnable(!recipeIsDone);
  }, [id]);

  const continueRecipeBtnVerify = useCallback(async () => {
    const mealOrCocktail = type === 'drinks' ? 'cocktails' : 'meals';
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const inProgressList = inProgressRecipes && inProgressRecipes[mealOrCocktail];
    const keys = inProgressList && Object.keys(inProgressRecipes[mealOrCocktail]);
    const recipeIsInProgress = keys && keys.some((key) => key === id);
    setIsInProgress(recipeIsInProgress);
  }, [id, type]);

  const setFavoriteState = useCallback(() => {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = favoriteRecipesStorage
    && favoriteRecipesStorage.some((recipe) => recipe.id === id);
    setFavorited(isFavorite);
  }, [id]);

  useEffect(() => {
    getRecipeDetails();
    getRecommendedRecipes();
    startBtnIsEnableFunc();
    continueRecipeBtnVerify();
  }, [
    getRecipeDetails, getRecommendedRecipes,
    startBtnIsEnableFunc, continueRecipeBtnVerify,
  ]);

  useEffect(() => {
    setFavoriteState();
  }, []);

  const onCopy = () => {
    copy(`http://localhost:3000${url}`);
    setShow(!show);
  };

  const addToFavorites = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const {
      [imagePlaceHolder]: image, [namePlaceHolder]: name, strCategory,
    } = recipeDetails;

    const newFavoriteRecipeObj = {
      id,
      type: type === 'drinks' ? 'drink' : 'food',
      nationality: type === 'drinks' ? '' : recipeDetails.strArea,
      category: strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic ? recipeDetails.strAlcoholic : '',
      name,
      image,
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
    <div className="details">
      <img
        src={ recipeDetails[imagePlaceHolder] }
        alt={ recipeDetails[namePlaceHolder] }
        data-testid="recipe-photo"
      />
      <section>
        <h1 data-testid="recipe-title">{ recipeDetails[namePlaceHolder] }</h1>
        {type === 'drinks'
          ? <p data-testid="recipe-category">{recipeDetails.strAlcoholic}</p>
          : (
            <p data-testid="recipe-category">
              Categoria:
              {' '}
              { recipeDetails.strCategory }
            </p>
          )}
        <Button
          ref={ target }
          variant="outline-success"
          data-testid="share-btn"
          onClick={ () => onCopy() }
        >
          <img src={ shareIcon } alt="Share icon" />
        </Button>
        <Overlay target={ target.current } show={ show } placement="bottom">
          <Tooltip id="overlay-example">
            Link copied!
          </Tooltip>
        </Overlay>
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
      </section>

      <p data-testid="instructions">
        Instruções:
        { recipeDetails.strInstructions }
      </p>
      <table>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <td>{ ingredient }</td>
              <td>{measures[index] ? measures[index] : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { recipeDetails.strYoutube && (
        <iframe
          title="Recipe video"
          height="380"
          width="400"
          src={ recipeDetails.strYoutube.replace('watch?v=', 'embed/') }
          data-testid="video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <Splide
        className="splide"
        options={ {
          rewind: true,
          perPage: 2,
          gap: 10,
        } }
      >
        {recommendedRecipes
          .map(({ [recommendedImage]: image, [recommendedName]: name }, index) => (
            <SplideSlide key={ index } data-testid={ `${index}-recomendation-card` }>
              <img src={ image } alt={ name } />
              <div>
                <p data-testid={ `${index}-recomendation-title` }>{name}</p>
              </div>
            </SplideSlide>
          ))}
      </Splide>
      { startBtnIsEnable && (
        <button
          type="button"
          className="start-recipe-btn"
          onClick={ () => history.push(`${url}/in-progress`) }
          data-testid="start-recipe-btn"
        >
          Start Recipe

        </button>
      )}
      { isInProgress && (
        <button
          type="button"
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
        >
          Continue Recipe

        </button>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  type: string.isRequired,
};
