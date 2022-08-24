import React, { useContext } from 'react';
import { shape, string } from 'prop-types';
import AppContext from '../context/AppContext';

import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

const NUMBER_TWELVE = 12;
export default function Foods({ location }) {
  const { mealRecipes, isSearchInputOpened } = useContext(AppContext);

  return (
    <div>
      {location.pathname === '/foods' && (
        <>
          <Header title="Foods" />
          { (isSearchInputOpened && mealRecipes) && mealRecipes
            .map(({ strMeal, strMealThumb }, index) => (
              index < NUMBER_TWELVE && <Card
                key={ index }
                index={ index }
                name={ strMeal }
                image={ strMealThumb }
              />
            ))}
          { !isSearchInputOpened && <Recipes type="meals" /> }
          <Footer />
        </>
      )}
    </div>
  );
}

Foods.propTypes = {
  location: shape({
    pathname: string,
  }).isRequired,
};
