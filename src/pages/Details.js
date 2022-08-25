import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesDetails from '../components/RecipeDetails';

export default function Drinks(history) {
  const { location } = history;
  return (

    <div>

      <Header title="Details" />
      <RecipesDetails
        history={ history }
        type={ location.pathname.includes('drinks') ? 'drinks' : 'meals' }
      />
      <Footer />
      {/* {location.pathname === '/drinks' && (
        <>
        </>
      )} */}
    </div>
  );
}
