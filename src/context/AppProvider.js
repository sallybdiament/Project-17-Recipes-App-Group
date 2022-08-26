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
