import React, { useState } from 'react';
import { node } from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [inputValue, setInputValue] = useState('');
  const [optionSearch, setOptionSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showCards, setShowCards] = useState(false);

  const contextValue = {
    inputValue,
    setInputValue,
    optionSearch,
    setOptionSearch,
    recipes,
    setRecipes,
    showCards,
    setShowCards,
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
