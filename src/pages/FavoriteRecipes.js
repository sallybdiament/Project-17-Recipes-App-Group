import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

/*
[{
    id: id-da-receita,
    type: food-ou-drink,
    nationality: nacionalidade-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita
}]
*/

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const unfavorite = (recipe) => {
    const newFavoriteRecipes = favoriteRecipes.filter((r) => r !== recipe);
    setFavoriteRecipes(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  const setFilter = (criteria) => {
    let filteredFavoriteRecipes;
    if (criteria !== 'all') {
      filteredFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
        .filter((recipe) => recipe.type === criteria);
    } else filteredFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(filteredFavoriteRecipes);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('food') }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
      >
        All
      </button>
      {favoriteRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
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
          <button
            type="button"
            onClick={ () => unfavorite(recipe) }
          >
            <img
              alt="Favorite button"
              src={ favoriteIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.type === 'drink'
              ? recipe.alcoholicOrNot
              : `${recipe.nationality} - ${recipe.category}`}
          </p>
        </div>
      ))}
    </div>
  );
}
