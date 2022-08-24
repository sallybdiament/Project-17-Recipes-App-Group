import React, { useContext } from 'react';
import { shape, string } from 'prop-types';
import AppContext from '../context/AppContext';

import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

const NUMBER_TWELVE = 12;
export default function Drinks({ location }) {
  const { drinksRecipes, isSearchInputOpened } = useContext(AppContext);

  return (
    <div>
      {location.pathname === '/drinks' && (
        <>
          <Header title="Drinks" />
          { (isSearchInputOpened && drinksRecipes) && drinksRecipes
            .map(({ strDrink, strDrinkThumb }, index) => (
              index < NUMBER_TWELVE && <Card
                key={ index }
                index={ index }
                name={ strDrink }
                image={ strDrinkThumb }
              />
            ))}
          { !isSearchInputOpened && <Recipes type="drinks" /> }
          <Footer />
        </>
      )}
    </div>
  );
}

Drinks.propTypes = {
  location: shape({
    pathname: string,
  }).isRequired,
};
