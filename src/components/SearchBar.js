import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        value="ingrediente"
        name="searchBar"
        // onChange={ onInputSortChange }
      />
      {' '}
      Ingrediente
      <input
        type="radio"
        data-testid="name-search-radio"
        value="nome"
        name="searchBar"
        // onChange={ onInputSortChange }
      />
      {' '}
      Nome
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        value="primeiraLetra"
        name="searchBar"
        // onChange={ onInputSortChange }
      />
      {' '}
      Primeira Letra
      <button
        type="submit"
        data-testid="exec-search-btn"
        // onClick={ onOrderClick }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
