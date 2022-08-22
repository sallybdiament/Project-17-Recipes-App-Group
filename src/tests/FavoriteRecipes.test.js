import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import FavoriteRecipes from "../pages/FavoriteRecipes";

describe('Testes com o componente FavoriteRecipes', () => {
  it('Verifica se ao renderizar o componente FavoriteRecipes aparecem os inputs de email e senha', () => {
    renderWithRouter(<FavoriteRecipes />);

    const favoriteRecEl = screen.getByRole('heading', {  name: /favorite recipes/i})
    expect(favoriteRecEl).toBeInTheDocument();
  });
  
  it('Verifica se ao clicar no food-bottom-btn é redirecionado para página /foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
   
    const mealIconEl = screen.getByTestId('food-bottom-btn');
    expect (mealIconEl).toBeInTheDocument();

    userEvent.click(mealIconEl);
    const { pathname } = history.location;
        expect(pathname).toBe('/foods');
  });
});