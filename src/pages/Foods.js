import React, { useContext, useEffect } from 'react';
import PropTypes, { func, shape } from 'prop-types';
import AppContext from '../context/AppContext';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Foods({ location, history: { push } }) {
  const { setHistory } = useContext(AppContext);
  useEffect(() => (
    setHistory(push)
  ));

  return (
    <div>
      {location.pathname === '/foods' && (
        <>
          <Header title="Foods" />
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
  history: shape({ push: func }).isRequired,
};
