import React from "react";
import { screen, waitFor } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import FavoriteRecipes from "../pages/FavoriteRecipes";
import AppProvider from "../context/AppProvider";

const favoriteRecipes = JSON.stringify([
  {
    id: '123',
    type: 'drink',
    nationality: '',
    category: '',
    alcoholicOrNot: 'alcoholic',
    name: 'Pinga',
    image: 'imagem-da-pinga'
  },
  {
    id: '456',
    type: 'food',
    nationality: 'brazilian',
    category: 'comida',
    alcoholicOrNot: '',
    name: 'lasanha',
    image: 'imagem-da-lasanha'
  }
]);

describe('Testes com o componente FavoriteRecipes', () => {
  it('Verifica se ao renderizar o componente FavoriteRecipes aparece o título Favorite Recipes', () => {
    const { history } =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      history.push('/favorite-recipes');

    const favoriteRecEl = screen.getByRole('heading', {  name: /favorite recipes/i})
    expect(favoriteRecEl).toBeInTheDocument();
  });
  
  it('Verifica se ao clicar no food-bottom-btn é redirecionado para página /foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
   
    const profileIconEl = screen.getByRole('img', {  name: /ícone de perfil/i});
    expect (profileIconEl).toBeInTheDocument();

    userEvent.click(profileIconEl);
    const { pathname } = history.location;
        expect(pathname).toBe('/profile');
  });

  it('Verifica "unfavorite button"', async () => {
    localStorage.setItem('favoriteRecipes', favoriteRecipes);
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const firstFavButton = await screen.findByTestId('0-horizontal-favorite-btn');
    userEvent.click(firstFavButton);

    const recipesTitles = await screen.findAllByTestId(/-horizontal-name/);
    expect(recipesTitles.length).toBe(1);
  });

  it('Verifica o filtro "food"', async () => {
    localStorage.setItem('favoriteRecipes', favoriteRecipes);
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const foodFilter = await screen.findByTestId('filter-by-food-btn');
    userEvent.click(foodFilter);

    const recipesTitles = await screen.findAllByTestId(/-horizontal-name/);
    expect(recipesTitles.length).toBe(1);
  });

  it('Verifica o filtro "drink"', async () => {
    localStorage.setItem('favoriteRecipes', favoriteRecipes);
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const drinkFilter = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilter);

    const recipesTitles = await screen.findAllByTestId(/-horizontal-name/);
    expect(recipesTitles.length).toBe(1);
  });

  it('Verifica o filtro "all"', async () => {
    localStorage.setItem('favoriteRecipes', favoriteRecipes);
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const allFilter = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(allFilter);

    const recipesTitles = await screen.findAllByTestId(/-horizontal-name/);
    expect(recipesTitles.length).toBe(2);
  });

  it('Verifica caso o localStorage esteja vazio', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const recipesTitles = await screen.queryByTestId('0-horizontal-name');
    expect(recipesTitles).not.toBeInTheDocument();
  });
});