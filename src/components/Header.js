import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  return (
    <div>
      <img
        src={ profileIcon }
        data-testid="profile-top-btn"
        alt="Ícone de perfil"
      />
      {(title !== 'Profile'
      && title !== 'Done Recipes'
      && title !== 'Favorite Recipes')
      && <img
        src="../images/searchIcon.svg"
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
