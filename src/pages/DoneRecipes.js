import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
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
            <img
              src={ shareIcon }
              alt="Share Icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
            <h1 data-testid={ `${index}-horizontal-top-text` }>Nome da categoria</h1>
            <h1 data-testid={ `${index}-horizontal-name` }>{recipe[recipeName]}</h1>
            <img
              data-testid={ `${index}-horizontal-image` }
              alt={ recipe[recipeName] }
              src={ recipe[recipeImage] }
            />
            <p data-testid={ `${index}-horizontal-done-date` }>Data</p>
            <p data-testid={ `${index}-${tagName}-horizontal-tag` }>Tags</p>
          </Link>
        );
      })}
    </div>
  );
}
