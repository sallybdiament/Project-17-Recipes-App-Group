import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import FavoriteRecipes from "../pages/FavoriteRecipes";

describe('Testes com o componente FavoriteRecipes', () => {
  it('Verifica se ao renderizar o componente FavoriteRecipes aparece o título Favorite Recipes', () => {
    renderWithRouter(<FavoriteRecipes />);

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
});