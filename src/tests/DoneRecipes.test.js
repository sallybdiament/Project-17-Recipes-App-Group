import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import DoneRecipes from "../pages/DoneRecipes";
import AppProvider from "../context/AppProvider";

describe('Testes com o componente DoneRecipes', () => {
  it('Verifica se ao renderizar o componente DoneRecipes aparecem o título Done Recipes', () => {
    const { history } =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      history.push('/done-recipes');

    const doneRecipesEl = screen.getByRole('heading', {  name: /done recipes/i})
    expect(doneRecipesEl).toBeInTheDocument();
  });
  
  it('Verifica se ao clicar no food-bottom-btn é redirecionado para página /foods', () => {
    const { history } =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      history.push('/done-recipes');
   
    const profileIconEl = screen.getByRole('img', {  name: /ícone de perfil/i});
    expect (profileIconEl).toBeInTheDocument();

    userEvent.click(profileIconEl);
    const { pathname } = history.location;
        expect(pathname).toBe('/profile');
  });
});