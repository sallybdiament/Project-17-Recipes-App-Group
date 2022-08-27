import React, { useState } from 'react';
import { node } from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isSearchInputOpened, toggleSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [optionSearch, setOptionSearch] = useState('');
  const [mealRecipes, setMealRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  // const [showCards, setShowCards] = useState(false);

  // const [allMeals, setMeals] = useState([]);
  // const [allDrinks, setDrinks] = useState([]);

  // useEffect(() => {
  //   fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setMeals(json.meals);
  //     });
  //   fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setDrinks(json.drinks);
  //     });
  // }, []);

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
    // allMeals,
    // allDrinks,
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
