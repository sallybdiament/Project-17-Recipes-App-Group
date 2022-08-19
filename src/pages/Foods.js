import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function Foods({ location }) {
  return (
    <div>
      {location.pathname === '/foods' && <Header title="Foods" />}
    </div>
  );
}

Foods.propTypes = {
  location: PropTypes.shape({
    ancestorOrigins: PropTypes.func,
    assign: PropTypes.func,
    hash: PropTypes.string,
    host: PropTypes.string,
    hostname: PropTypes.string,
    href: PropTypes.string,
    origin: PropTypes.string,
    pathname: PropTypes.string,
    port: PropTypes.string,
    protocol: PropTypes.string,
    reload: PropTypes.func,
    replace: PropTypes.func,
    search: PropTypes.string,
    toString: PropTypes.func,
    valueOf: PropTypes.func,
  }).isRequired,
};
