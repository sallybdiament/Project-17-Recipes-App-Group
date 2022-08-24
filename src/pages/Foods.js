import React, { useContext } from 'react';
import PropTypes, { func, number, objectOf, shape, string } from 'prop-types';
import AppContext from '../context/AppContext';

import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

const NUMBER_TWELVE = 12;
export default function Foods({ location, history }) {
  const { mealRecipes } = useContext(AppContext);

  return (
    <div>
      {location.pathname === '/foods' && (
        <>
          <Header title="Foods" history={ history } />
          { mealRecipes && mealRecipes.map(({ strMeal, strMealThumb }, index) => (
            index < NUMBER_TWELVE && <Card
              key={ index }
              index={ index }
              name={ strMeal }
              image={ strMealThumb }
            />
          ))}
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
  history: shape(objectOf(func, string, number)).isRequired,
};
