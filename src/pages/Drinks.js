import React, { useContext } from 'react';
import PropTypes, { func, number, objectOf, shape, string } from 'prop-types';
import AppContext from '../context/AppContext';

import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

const NUMBER_TWELVE = 12;
export default function Drinks({ location, history }) {
  const { drinksRecipes } = useContext(AppContext);

  return (
    <div>
      {location.pathname === '/drinks' && (
        <>
          <Header title="Drinks" history={ history } />
          { drinksRecipes && drinksRecipes.map(({ strDrink, strDrinkThumb }, index) => (
            index < NUMBER_TWELVE && <Card
              key={ index }
              index={ index }
              name={ strDrink }
              image={ strDrinkThumb }
            />
          ))}
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
  history: shape(objectOf(func, string, number)).isRequired,
};
