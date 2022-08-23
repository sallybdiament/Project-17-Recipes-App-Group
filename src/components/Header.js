import React, { useState, useContext } from 'react';
import PropTypes, { func, number, objectOf, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import AppContext from '../context/AppContext';

export default function Header({ title, history }) {
  const [isSearchInputOpened, toggleSearchInput] = useState(false);

  const { inputValue, setInputValue } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setInputValue(target.value);
  };

  return (
    <div>
      <Link to="/profile">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Ícone de perfil"
        />
      </Link>
      {(title !== 'Profile'
        && title !== 'Done Recipes'
        && title !== 'Favorite Recipes')
        && (
          <button
            type="button"
            onClick={ () => toggleSearchInput(!isSearchInputOpened) }
          >
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Ícone de pesquisa"
            />
          </button>
        )}
      {isSearchInputOpened && <input
        data-testid="search-input"
        value={ inputValue }
        onChange={ handleChange }
      />}
      <h1 data-testid="page-title">{title}</h1>
      <SearchBar pageName={ title } history={ history } />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  history: shape(objectOf(func, string, number)).isRequired,
};
