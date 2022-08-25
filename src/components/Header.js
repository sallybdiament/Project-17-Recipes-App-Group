import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import '../styles/Header.css';

import AppContext from '../context/AppContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  const { isSearchInputOpened, toggleSearchInput } = useContext(AppContext);

  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/profile">
          <img
            className="header-profile-icon"
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="Ícone de perfil"
          />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {(title !== 'Profile'
        && title !== 'Done Recipes'
        && title !== 'Favorite Recipes')
        && (
          <button
            className="header-search-btn"
            type="button"
            onClick={ () => toggleSearchInput(!isSearchInputOpened) }
          >
            <img
              className="header-search-icon"
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Ícone de pesquisa"
            />
          </button>
        )}
      </div>
      {isSearchInputOpened && <SearchBar pageName={ title } /> }
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
};
