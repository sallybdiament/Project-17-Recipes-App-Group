import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import DoneRecipes from "../pages/DoneRecipes";

describe('Testes com o componente DoneRecipes', () => {
  it('Verifica se ao renderizar o componente DoneRecipes aparecem os inputs de email e senha', () => {
    renderWithRouter(<DoneRecipes />);

    const doneRecipesEl = screen.getByRole('heading', {  name: /done recipes/i})
    expect(doneRecipesEl).toBeInTheDocument();
  });
  
  it('Verifica se ao clicar no food-bottom-btn é redirecionado para página /foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
   
    const mealIconEl = screen.getByTestId('food-bottom-btn');
    expect (mealIconEl).toBeInTheDocument();

    userEvent.click(mealIconEl);
    const { pathname } = history.location;
        expect(pathname).toBe('/foods');
  });
});