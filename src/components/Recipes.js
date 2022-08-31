import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardGroup } from 'react-bootstrap';

export default function Recipes({ type }) {
  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [categories, setCategories] = useState([]);
  const [isFilterActive, toggleFilter] = useState({});

  const history = useHistory();

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
    <div style={ { padding: '20px 0 90px 0' } }>
      <ButtonGroup
        size="sm"
        className="d-flex flex-wrap justify-content-center ml-2 mr-2 mb-3"
      >
        {categories.map((category, index) => (
          <Button
            variant="outline-success"
            key={ index }
            type="button"
            data-testid={ `${category}-category-filter` }
            onClick={ () => filterRecipes(category) }
          >
            {category}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline-success"
          data-testid="All-category-filter"
          onClick={ fetchAPIs }
        >
          All
        </Button>
      </ButtonGroup>
      <CardGroup className="d-flex flex-wrap justify-content-center ml-2 mr-2">
        {recipes.map((recipe, index) => {
          let link;
          if (type === 'meals') link = '/foods/';
          else link = '/drinks/';
          return (
            <Card
              className="m-2"
              key={ index }
              data-testid={ `${index}-recipe-card` }
              style={ { width: '9rem' } }
            >
              <Card.Img
                alt={ recipe[recipeName] }
                src={ recipe[recipeImage] }
                data-testid={ `${index}-card-img` }
              />
              <Card.Body className="p-3">
                <Card.Title
                  data-testid={ `${index}-card-name` }
                >
                  {recipe[recipeName]}
                </Card.Title>
                <Button
                  size="sm"
                  variant="success"
                  onClick={ () => history.push(`${link}${recipe[recipeId]}`) }
                >
                  Details
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardGroup>
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};
