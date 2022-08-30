import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
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
  const history = useHistory();
  const { recipeDetails, setRecipeDetails } = useContext(AppContext);

  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState(inProgressRecipesDefault);
  const [finishBtnIsEnabled, setFinishBtn] = useState(true);

  const typePage = pathname.includes('drinks') ? 'drinks' : 'meals';
  const recipeType = pathname.includes('drinks') ? 'cocktails' : 'meals';

  const toggleFinishBtn = (inProgressObj, ingredientsList) => {
    const arrayOfIngredients = inProgressObj[recipeType][id]
      ? inProgressObj[recipeType][id]
      : [];
    const allIngredientsIsDone = arrayOfIngredients
     && arrayOfIngredients.length === ingredientsList.length;
    console.log(allIngredientsIsDone);
    setFinishBtn(!allIngredientsIsDone);
  };

  const getRecipeDetails = useCallback(async () => {
    const detailsData = await fetchRecipeDetails(typePage, id);
    const ingredientsList = ingredientsAndMeasuresList(detailsData, 'strIngredient');
    const measuresList = ingredientsAndMeasuresList(detailsData, 'strMeasure');
    const inProgressStorage = await JSON.parse(localStorage.getItem('inProgressRecipes'));

    setIngredients(ingredientsList);
    setMeasures(measuresList);
    setRecipeDetails(detailsData);
    if (inProgressStorage) {
      setInProgressRecipes(inProgressStorage);
      toggleFinishBtn(inProgressStorage, ingredientsList);
    }
  }, []);

  useEffect(() => {
    getRecipeDetails();
  }, []);

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
      toggleFinishBtn(newInProgressObj, ingredients);
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
      toggleFinishBtn(newInProgressObj, ingredients);
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
    toggleFinishBtn(newInProgressObj, ingredients);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressObj));
  };

  const namePlaceHolder = typePage === 'drinks' ? 'strDrink' : 'strMeal';
  const imagePlaceHolder = typePage === 'drinks' ? 'strDrinkThumb' : 'strMealThumb';

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
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ finishBtnIsEnabled }
            onClick={ () => history.push('/done-recipes') }
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
}
