import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={ Login } />
      <Route path="/foods" exact component={ Foods } />
      <Route path="/drinks" exact component={ Drinks } />
      <Route path="/foods/:id" exact component={ Foods } />
      <Route path="/drinks/:id" exact component={ Drinks } />
      <Route path="/foods/:id/in-progress" component={ Foods } />
      <Route path="/drinks/:id/in-progress" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </BrowserRouter>
  );
}

export default App;
