import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import foodAPI from '../services/foodAPI';

function SearchBar() {
  const { inputValue, optionSearch,
    setOptionSearch, setRecipes } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setOptionSearch(target.value);
  };

  const handleClick = () => {
    let endpoint = '';
    let recipes = [];
    if (inputValue.length > 1 && optionSearch === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && optionSearch === 'firstLetter') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipes = foodAPI(endpoint).meals;
    }
    if (optionSearch === 'ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      recipes = foodAPI(endpoint).meals;
    }
    if (optionSearch === 'name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipes = foodAPI(endpoint).meals;
    }
    setRecipes(recipes);
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

export default SearchBar;
