import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { Button, Image, Table } from 'react-bootstrap';
import ingredientsAndMeasuresList from '../helpers/detailsDataNormalizer';
import { fetchRecipeDetails, fetchRecommendedRecipes } from '../services/fetchDetailsAPI';

import ShareButton from './ShareButton';
import AppContext from '../context/AppContext';
import FavoriteButton from './FavoriteButton';

export default function RecipeDetails() {
  const { params: { id }, url } = useRouteMatch();
  const { pathname } = useLocation();
  const type = pathname.includes('drinks') ? 'drinks' : 'meals';

  const history = useHistory();
  const { recipeDetails, setRecipeDetails } = useContext(AppContext);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [startBtnIsEnable, setStartBtnIsEnable] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);

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

  useEffect(() => {
    getRecipeDetails();
    getRecommendedRecipes();
    startBtnIsEnableFunc();
    continueRecipeBtnVerify();
  }, [
    getRecipeDetails, getRecommendedRecipes,
    startBtnIsEnableFunc, continueRecipeBtnVerify,
  ]);

  return (
    <div className="pl-3 pr-3 mb-4">
      <Image
        className="mt-3 mb-4"
        thumbnail
        rounded
        src={ recipeDetails[imagePlaceHolder] }
        alt={ recipeDetails[namePlaceHolder] }
        data-testid="recipe-photo"
      />
      <section>
        <section className="d-flex justify-content-between">
          <h1 data-testid="recipe-title">{ recipeDetails[namePlaceHolder] }</h1>
          <section className="d-flex align-items-center">
            <ShareButton />
            <FavoriteButton />
          </section>
        </section>
        {type === 'drinks'
          ? <p data-testid="recipe-category">{recipeDetails.strAlcoholic}</p>
          : (
            <p data-testid="recipe-category">
              Categoria:
              {' '}
              { recipeDetails.strCategory }
            </p>
          )}
      </section>
      <section className="mb-4" data-testid="instructions">
        <h3>Instruções</h3>
        { recipeDetails.strInstructions }
      </section>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Ingredient</th>
            <th>Measure</th>
          </tr>
          {ingredients.map((ingredient, index) => (
            <tr key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <td>{ ingredient }</td>
              <td>{measures[index] ? measures[index] : ''}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
        <Button
          type="button"
          className="b"
          onClick={ () => history.push(`${url}/in-progress`) }
          data-testid="start-recipe-btn"
        >
          Start Recipe

        </Button>
      )}
      { isInProgress && (
        <button
          type="button"
          className="position-fixed"
          data-testid="start-recipe-btn"
        >
          Continue Recipe

        </button>
      )}
    </div>
  );
}
