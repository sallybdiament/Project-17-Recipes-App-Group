import React, { useContext } from 'react';
import PropTypes, { func, number, objectOf, shape, string } from 'prop-types';

import AppContext from '../context/AppContext';
import foodAPI from '../services/foodAPI';

function SearchBar({ pageName, history }) {
  const {
    inputValue, setInputValue, optionSearch, setOptionSearch,
    setMealRecipes, setDrinksRecipes,
  } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setOptionSearch(target.value);
  };

  const checkRecipes = (recipesList) => {
    if (!recipesList) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (recipesList) {
      if (recipesList.length === 1 && pageName === 'Foods') {
        history.push(`/foods/${recipesList[0].idMeal}`);
      }
      if (recipesList.length === 1 && pageName === 'Drinks') {
        history.push(`/drinks/${recipesList[0].idDrink}`);
      }
    }
    // setShowCards(true);
  };

  const fetchMeals = async () => {
    let endPoint = '';
    let mealRecipesList = [];

    if (inputValue.length > 1 && optionSearch === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && optionSearch === 'firstLetter') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
      mealRecipesList = (await foodAPI(endPoint)).meals;
      checkRecipes(mealRecipesList);
    }
    if (optionSearch === 'ingredient') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      mealRecipesList = (await foodAPI(endPoint)).meals;
      checkRecipes(mealRecipesList);
    }
    if (optionSearch === 'name') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
      mealRecipesList = (await foodAPI(endPoint)).meals;
      checkRecipes(mealRecipesList);
    }
    await setMealRecipes(mealRecipesList);
  };

  const fetchDrinks = async () => {
    let endpoint = '';
    let drinksRecipesList = [];

    if (inputValue.length > 1 && optionSearch === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && optionSearch === 'firstLetter') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
      drinksRecipesList = (await foodAPI(endpoint)).drinks;
      checkRecipes(drinksRecipesList);
    }
    if (optionSearch === 'ingredient') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      drinksRecipesList = (await foodAPI(endpoint)).drinks;
      checkRecipes(drinksRecipesList);
    }
    if (optionSearch === 'name') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
      drinksRecipesList = (await foodAPI(endpoint)).drinks;
      checkRecipes(drinksRecipesList);
    }
    await setDrinksRecipes(drinksRecipesList);
  };

  const handleClick = async () => {
    if (pageName === 'Foods') {
      await fetchMeals();
      setInputValue('');
    }
    if (pageName === 'Drinks') {
      await fetchDrinks();
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        type="radio"
        name="searchBar"
        value="ingredient"
        onChange={ handleChange }
        data-testid="ingredient-search-radio"
      />
      {' '}
      Ingredient
      <input
        type="radio"
        name="searchBar"
        value="name"
        onChange={ handleChange }
        data-testid="name-search-radio"
      />
      {' '}
      Name
      <input
        type="radio"
        name="searchBar"
        value="firstLetter"
        onChange={ handleChange }
        data-testid="first-letter-search-radio"
      />
      {' '}
      First letter
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  pageName: PropTypes.string.isRequired,
  history: shape(objectOf(func, string, number)).isRequired,
};

export default SearchBar;
