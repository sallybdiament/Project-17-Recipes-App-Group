import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
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
      && <img
        src={ searchIcon }
        data-testid="search-top-btn"
        alt="Ícone de pesquisa"
      />}
      <h1 data-testid="page-title">{title}</h1>
      <SearchBar />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
