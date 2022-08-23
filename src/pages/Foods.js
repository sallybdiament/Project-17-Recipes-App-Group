import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Foods({ location }) {
  return (
    <div>
      {location.pathname === '/foods' && (
        <>
          <Header title="Foods" />
          <Recipes type="meals" />
          <Footer />
        </>
      )}
    </div>
  );
}

Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
