import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const numberThree = 3;
  // const doneRecipesLocalStorage = [{
  //   id: '52768',
  //   // idMeal
  //   type: 'food',
  //   nationality: 'British',
  //   // strArea
  //   category: 'Dessert',
  //   // strCategory
  //   alcoholicOrNot: '',
  //   // strDrinkAlternate
  //   name: 'Apple Frangipan Tart',
  //   // strMeal
  //   image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
  //   // strMealThumb
  //   doneDate: '2/2/22',
  //   // "dateModified": null
  //   tags: ['Tart', 'Baking', 'Fruity'],
  //   // "strTags": "Tart,Baking,Fruity",
  // }];

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
      {doneRecipesLocalStorage.map((recipe, index) => {
        let link;
        if (recipe.type === 'meals') link = '/foods/';
        else link = '/drinks/';
        return (
          <Link
            // to={ `${link}${recipe[id]}` }
            to={ link }
            key={ recipe.id }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ shareIcon }
              alt="Share Icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipe.nationality} - ${recipe.category}`}

            </p>
            <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
            <img
              data-testid={ `${index}-horizontal-image` }
              alt={ recipe.name }
              src={ recipe.image }
            />
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            { recipe.tags.map((tag, i) => (
              index < numberThree
              && <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            ))}
          </Link>
        );
      })}
    </div>
  );
}
