import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import AppContext from '../context/AppContext';
import foodAPI from '../services/foodAPI';

function SearchBar({ pageName }) {
  const {
    inputValue, optionSearch, setOptionSearch, setMealRecipes, setDrinksRecipes,
  } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setOptionSearch(target.value);
  };

  // const checkRecipes = (recipesList) => {
  //   if (recipesList.length === 0) {
  //     global.alert('Sorry, we haven\'t found any recipes for these filters.');
  //   }
  //   if (recipesList.length === 1 && pageName === 'Foods') {
  //     console.log('sim');
  //     // history.push(`/foods/${recipes.id}`);
  //   }
  //   if (recipesList.length === 1 && pageName === 'Drinks') {
  //     console.log('sim');
  //     // history.push(`/foods/${recipes.id}`);
  //   }
  //   setShowCards(true);
  // };

  const fetchMeals = async () => {
    let endPoint = '';
    let mealRecipes = [];
    if (inputValue.length > 1 && optionSearch === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && optionSearch === 'firstLetter') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
      mealRecipes = await foodAPI(endPoint);
    }
    if (optionSearch === 'ingredient') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      mealRecipes = await foodAPI(endPoint);
    }
    if (optionSearch === 'name') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
      mealRecipes = await foodAPI(endPoint);
    }
    setMealRecipes(mealRecipes.meals);
  };

  const fetchDrinks = async () => {
    let endpoint = '';
    let drinksRecipes = [];
    if (inputValue.length > 1 && optionSearch === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && optionSearch === 'firstLetter') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
      drinksRecipes = await foodAPI(endpoint);
      // checkRecipes(drinksRecipes);
    }
    if (optionSearch === 'ingredient') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      drinksRecipes = await foodAPI(endpoint);
      // checkRecipes(drinksRecipes);
    }
    if (optionSearch === 'name') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
      drinksRecipes = await foodAPI(endpoint);
      // checkRecipes(drinksRecipes);
    }
    setDrinksRecipes(drinksRecipes.drinks);
  };

  const handleClick = () => {
    if (pageName === 'Foods') {
      fetchMeals();
      // checkRecipes();
    }
    if (pageName === 'Drinks') {
      fetchDrinks();
      // checkRecipes();
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
};

export default SearchBar;
