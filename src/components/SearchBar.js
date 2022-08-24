import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';

import AppContext from '../context/AppContext';
import foodAPI from '../services/foodAPI';

function SearchBar({ pageName }) {
  const history = useHistory();

  const {
    inputValue,
    setInputValue,
    optionSearch,
    setOptionSearch,
    setMealRecipes,
    setDrinksRecipes,
  } = useContext(AppContext);

  const handleChange = ({ target }) => (
    target.name === 'searchInput'
      ? setInputValue(target.value)
      : setOptionSearch(target.value)
  );

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
    <div className="search-container">
      <section className="search-bar-container">
        <input
          className="search-bar"
          name="searchInput"
          data-testid="search-input"
          value={ inputValue }
          onChange={ handleChange }
        />
      </section>
      <section className="search-btn-container">
        <label htmlFor="radioSearchBtn">
          <input
            type="radio"
            id="radioSearchBtn"
            name="searchBar"
            value="ingredient"
            onChange={ handleChange }
            data-testid="ingredient-search-radio"
          />
          {' '}
          Ingredient
        </label>
        <label htmlFor="radioSearchBtn">
          <input
            type="radio"
            id="radioSearchBtn"
            name="searchBar"
            value="name"
            onChange={ handleChange }
            data-testid="name-search-radio"
          />
          {' '}
          Name
        </label>
        <label htmlFor="radioSearchBtn">
          <input
            type="radio"
            id="radioSearchBtn"
            name="searchBar"
            value="firstLetter"
            onChange={ handleChange }
            data-testid="first-letter-search-radio"
          />
          {' '}
          First letter
        </label>
        <button
          className="search-btn"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </section>
    </div>
  );
}

SearchBar.propTypes = {
  pageName: string.isRequired,
};

export default SearchBar;
