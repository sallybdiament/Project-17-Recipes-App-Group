import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isSearchInputOpened, toggleSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [optionSearch, setOptionSearch] = useState('');
  const [mealRecipes, setMealRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);

  // const [showCards, setShowCards] = useState(false);

  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const ingredients = {
    cocktails: {
      // 'id-da-bebida': [lista-de-ingredientes-utilizados],
    },
    meals: {
      // 'id-da-comida': [lista-de-ingredientes-utilizados],
    },
  };

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((json) => {
        setMeals(json.meals);
        json.meals.forEach((meal) => ingredients.meals[idMeal] = )
      });
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((json) => {
        setDrinks(json.drinks);
      });
  }, []);

  const contextValue = {
    isSearchInputOpened,
    toggleSearchInput,
    inputValue,
    setInputValue,
    optionSearch,
    setOptionSearch,
    mealRecipes,
    setMealRecipes,
    drinksRecipes,
    setDrinksRecipes,
    meals,
    drinks,
  };

  return (
    <AppContext.Provider
      value={ contextValue }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: node.isRequired,
};

export default AppProvider;
