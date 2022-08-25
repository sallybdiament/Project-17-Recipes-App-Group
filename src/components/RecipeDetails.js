import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import normalizeIgredientsAndMeasuresToList from '../helpers/detailsDataNormalizer';
import { fetchDetails, fetchRecommended } from '../services/fetchDetailsAPI';

export default function RecipeDetails(props) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [igrendientsAndMeasures, setIgrendientsAndMeasures] = useState({
    ingredients: [],
    measures: [],
  });
  const { history, type } = props;
  const { id } = history.match.params;

  const recipeDetailsObjectPlaceHolders = {
    id: type === 'drinks' ? 'idDrink' : 'idMeal',
    image: type === 'drinks' ? 'strDrinkThumb' : 'strMealThumb',
    name: type === 'drinks' ? 'strGlass' : 'strMeal',
  };

  const getDetails = useCallback(
    async () => {
      const data = await fetchDetails(type, id);
      const listOfStrIngredient = normalizeIgredientsAndMeasuresToList(
        data, 'strIngredient',
      );
      const listOfStrMeasures = normalizeIgredientsAndMeasuresToList(
        data, 'strMeasure',
      );
      setIgrendientsAndMeasures({
        ingredients: listOfStrIngredient,
        measures: listOfStrMeasures,
      });
      setRecipeDetails(data);
    },
    [type, id],
  );
  const getRecommended = useCallback(
    async () => {
      const data = await fetchRecommended(type);
      setRecommendedRecipes(data);
    },
    [type],
  );
  // fetch no momento q der mount
  useEffect(() => {
    getDetails();
    getRecommended();
  }, [getDetails, getRecommended]);

  return (
    <div className="details">
      {/* {console.log(igrendientsAndMeasures)} */}
      <h1 data-testid="recipe-title">
        Titulo:
        {recipeDetails[recipeDetailsObjectPlaceHolders.name]}
      </h1>
      <p data-testid="recipe-category">
        Categoria:
        {recipeDetails.strCategory}
      </p>
      <img
        src={ recipeDetails[recipeDetailsObjectPlaceHolders.image] }
        alt={ recipeDetails[recipeDetailsObjectPlaceHolders.name] }
        data-testid="recipe-photo"
      />
      <p data-testid="instructions">
        Instruçoes:
        {recipeDetails.strInstructions}
      </p>
      {}
      <div className="igredients-measure">
        {igrendientsAndMeasures.ingredients.map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient[`strIngredient${String(index + 1)}`]}`}
            -
            {igrendientsAndMeasures.measures[index]
              && igrendientsAndMeasures.measures[index][`strMeasure${String(index + 1)}`]}
          </p>))}
      </div>
      {/* {console.log(recipeDetails, ' recipedetails')} */}
      {console.log(recommendedRecipes)}
      {recipeDetails.strYoutube && (
        <embed
          title="youtube"
          height="380"
          width="400"
          src={ recipeDetails.strYoutube.replace('watch?v=', 'embed/') }
        />)}

    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
    location: PropTypes.shape({}),
    pathname: PropTypes.shape({}),
  }).isRequired,
  type: PropTypes.string.isRequired,
};
