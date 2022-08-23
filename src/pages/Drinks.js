import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Drinks({ location }) {
  return (
    <div>
      {location.pathname === '/drinks' && (
        <>
          <Header title="Drinks" />
          <Recipes type="drinks" />
          <Footer />
        </>
      )}
    </div>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
