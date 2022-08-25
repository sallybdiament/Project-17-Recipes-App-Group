import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const numberThree = 3;
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipes) setDoneRecipes(recipes);
  }, []);

  const setFilter = (criteria) => {
    let filteredDoneRecipes;
    if (criteria !== 'all') {
      filteredDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
        .filter((recipe) => recipe.type === criteria);
    } else filteredDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(filteredDoneRecipes);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      {doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            // key={ recipe.id }
            // data-testid={ `${index}-recipe-card` }
          >
            <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
            <img
              data-testid={ `${index}-horizontal-image` }
              alt={ recipe.name }
              src={ recipe.image }
            />
          </Link>
          <button
            type="button"
            onClick={ ({ target }) => {
              target.innerHTML = 'Link copied!';
              copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
            } }
          >
            <img
              alt="Share Button"
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipe.nationality} - ${recipe.category} - ${recipe.alcoholicOrNot}`}

          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          { recipe.tags.map((tag, i) => (
            index < numberThree
              && <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
