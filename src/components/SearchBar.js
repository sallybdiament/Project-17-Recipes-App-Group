import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import foodAPI from '../services/foodAPI';

function SearchBar({ pageName }) {
  const { inputValue, optionSearch,
    setOptionSearch, recipes, setRecipes,
    showCards, setShowCards } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setOptionSearch(target.value);
  };

  const checkRecipes = (recipesList) => {
    if (recipesList.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (recipesList.length === 1 && pageName === 'Foods') {
      console.log('sim');
      // history.push(`/foods/${recipes.id}`);
    }
    if (recipesList.length === 1 && pageName === 'Drinks') {
      console.log('sim');
      // history.push(`/foods/${recipes.id}`);
    }
    setShowCards(true);
  };

  const fetchMeals = () => {
    let endpoint = '';
    let recipesList = [];
    if (inputValue.length > 1 && optionSearch === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && optionSearch === 'firstLetter') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipesList = foodAPI(endpoint).meals;
    }
    if (optionSearch === 'ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      recipesList = foodAPI(endpoint).meals;
    }
    if (optionSearch === 'name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipesList = foodAPI(endpoint).meals;
    }
    setRecipes(recipesList);
  };

  const fetchDrinks = async () => {
    let endpoint = '';
    let recipesList = [];
    if (inputValue.length > 1 && optionSearch === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && optionSearch === 'firstLetter') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipesList = await foodAPI(endpoint).meals;
      checkRecipes(recipesList);
    }
    if (optionSearch === 'ingredient') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      recipesList = await foodAPI(endpoint).meals;
      checkRecipes(recipesList);
    }
    if (optionSearch === 'name') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipesList = await foodAPI(endpoint).meals;
      checkRecipes(recipesList);
    }
    setRecipes(recipesList);
  };

  const handleClick = () => {
    if (pageName === 'Foods') {
      fetchMeals();
      checkRecipes();
    }
    if (pageName === 'Drinks') {
      fetchDrinks();
      checkRecipes();
    }
  };

  return (
    <div>
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        value="ingredient"
        name="searchBar"
        onChange={ handleChange }
      />
      {' '}
      Ingredient
      <input
        type="radio"
        data-testid="name-search-radio"
        value="name"
        name="searchBar"
        onChange={ handleChange }
      />
      {' '}
      Name
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        value="firstLetter"
        name="searchBar"
        onChange={ handleChange }
      />
      {' '}
      First letter
      <button
        type="submit"
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
