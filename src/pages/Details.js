import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../components/Header';
import RecipesDetails from '../components/RecipeDetails';
import Footer from '../components/Footer';

export default function Drinks() {
  const { pathname } = useLocation();
  return (
    <div>
      <Header title="Details" />
      <RecipesDetails type={ pathname.includes('drinks') ? 'drinks' : 'meals' } />
      <Footer />
    </div>
  );
}
