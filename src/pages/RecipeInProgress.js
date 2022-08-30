import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { fetchRecipeDetails } from '../services/fetchDetailsAPI';
import ingredientsAndMeasuresList from '../helpers/detailsDataNormalizer';
import AppContext from '../context/AppContext';

import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

const inProgressRecipesDefault = {
  cocktails: {},
  meals: {},
};

export default function RecipeInProgress() {
  const { params: { id } } = useRouteMatch();
  const { pathname } = useLocation();
  const { recipeDetails, setRecipeDetails } = useContext(AppContext);

  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState(inProgressRecipesDefault);
  const [recipeType, setRecipeType] = useState('');

  const type = pathname.includes('drinks') ? 'drinks' : 'meals';

  const getRecipeDetails = useCallback(async () => {
    const detailsData = await fetchRecipeDetails(type, id);
    const ingredientsList = ingredientsAndMeasuresList(detailsData, 'strIngredient');
    const measuresList = ingredientsAndMeasuresList(detailsData, 'strMeasure');

    setRecipeType(type === 'drinks' ? 'cocktails' : 'meals');
    setIngredients(ingredientsList);
    setMeasures(measuresList);
    setRecipeDetails(detailsData);
  }, []);

  const getRecipesInProgress = useCallback(() => {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressStorage) setInProgressRecipes(inProgressStorage);
  }, []);

  useEffect(() => {
    getRecipeDetails();
    getRecipesInProgress();
  }, [getRecipeDetails, getRecipesInProgress]);

  const isIngredientChecked = (ingredient) => inProgressRecipes[recipeType][id]
    && inProgressRecipes[recipeType][id].includes(ingredient);

  const checkIngredient = (ingredient) => {
    if (inProgressRecipes[recipeType][id]) {
      const newInProgressObj = {
        ...inProgressRecipes,
        [recipeType]: {
          [id]: [...inProgressRecipes[recipeType][id], ingredient],
        },
      };
      setInProgressRecipes(newInProgressObj);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressObj));
    } else {
      const newInProgressObj = {
        ...inProgressRecipes,
        [recipeType]: {
          [id]: [ingredient],
        },
      };
      setInProgressRecipes(newInProgressObj);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressObj));
    }
  };

  const unCheckIngredient = (ingredient) => {
    const oldArray = inProgressRecipes[recipeType][id];
    const newArray = oldArray.filter((item) => item !== ingredient);
    const newInProgressObj = {
      ...inProgressRecipes,
      [recipeType]: {
        [id]: [...newArray],
      },
    };
    setInProgressRecipes(newInProgressObj);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressObj));
  };

  const namePlaceHolder = type === 'drinks' ? 'strDrink' : 'strMeal';
  const imagePlaceHolder = type === 'drinks' ? 'strDrinkThumb' : 'strMealThumb';

  const {
    [namePlaceHolder]: name, [imagePlaceHolder]: image, strCategory, strInstructions,
  } = recipeDetails;

  return (
    <div>
      {recipeDetails && (
        <div>
          <h1 data-testid="recipe-title">{ name }</h1>
          <img src={ image } alt={ name } data-testid="recipe-photo" />
          <ShareButton />
          <FavoriteButton />
          <h3 data-testid="recipe-category">{ strCategory }</h3>
          <table>
            <tbody>
              <tr>
                <th>Ingredient</th>
                <th>Measure</th>
                <th>Status</th>
              </tr>
              {ingredients.map((ingredient, index) => (
                <tr key={ index } data-testid={ `${index}-ingredient-step` }>
                  <td>{ ingredient }</td>
                  <td>{measures[index] ? measures[index] : ''}</td>
                  <td>
                    <input
                      type="checkbox"
                      id={ ingredient }
                      defaultChecked={ isIngredientChecked(ingredient) }
                      onChange={ isIngredientChecked(ingredient)
                        ? () => unCheckIngredient(ingredient)
                        : () => checkIngredient(ingredient) }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p data-testid="instructions">{ strInstructions }</p>
          <button type="button" data-testid="finish-recipe-btn">Finish</button>
        </div>
      )}
    </div>
  );
}
