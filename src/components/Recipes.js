import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Recipes({ type }) {
  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [categories, setCategories] = useState([]);
  const [isFilterActive, toggleFilter] = useState({});

  const fetchAPIs = () => {
    let recipesUrl;
    let categoriesUrl;
    if (type === 'meals') {
      recipesUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      categoriesUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      setRecipeId('idMeal');
      setRecipeImage('strMealThumb');
      setRecipeName('strMeal');
    } else {
      recipesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      categoriesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      setRecipeId('idDrink');
      setRecipeImage('strDrinkThumb');
      setRecipeName('strDrink');
    }
    fetch(recipesUrl)
      .then((response) => response.json())
      .then((json) => {
        const twelve = 12;
        const twelveRecipes = json[type].filter((recipe, index) => index < twelve);
        setRecipes(twelveRecipes);
      });
    fetch(categoriesUrl)
      .then((response) => response.json())
      .then((json) => {
        const five = 5;
        const fiveCategories = json[type]
          .map((category) => category.strCategory)
          .filter((cat, index) => index < five);
        setCategories(fiveCategories);
      });
  };

  useEffect(fetchAPIs, [type]);
  useEffect(() => {
    categories.forEach((c) => {
      toggleFilter({
        ...isFilterActive,
        [c]: false,
      });
    });
  }, [categories]);

  const filterRecipes = (category) => {
    if (isFilterActive[category]) fetchAPIs();
    else {
      toggleFilter({
        ...isFilterActive,
        [category]: true,
      });
      let apiUrl;
      if (type === 'meals') apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      else apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((json) => {
          const twelve2 = 12;
          const twelveRecipes = json[type].filter((recipe, index) => index < twelve2);
          setRecipes(twelveRecipes);
        });
    }
  };

  return (
    <div>
      {categories.map((category, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${category}-category-filter` }
          onClick={ () => filterRecipes(category) }
        >
          {category}
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ fetchAPIs }
      >
        All
      </button>
      {recipes.map((recipe, index) => {
        let link;
        if (type === 'meals') link = '/foods/';
        else link = '/drinks/';
        return (
          <Link
            to={ `${link}${recipe[recipeId]}` }
            key={ recipe[recipeId] }
            data-testid={ `${index}-recipe-card` }
          >
            <h1 data-testid={ `${index}-card-name` }>{recipe[recipeName]}</h1>
            <img
              data-testid={ `${index}-card-img` }
              alt={ recipe[recipeName] }
              src={ recipe[recipeImage] }
            />
          </Link>
        );
      })}
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};
