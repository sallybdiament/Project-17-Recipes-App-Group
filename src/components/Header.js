import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
  const [isSearchInputOpened, toggleSearchInput] = useState(false);

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
      {isSearchInputOpened && <input data-testid="search-input" />}
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
