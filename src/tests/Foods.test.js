import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import Foods from "../pages/Foods";

describe('Testes com o componente Foods', () => {
  it('Verifica se ao renderizar o componente Foods aparecem os inputs de email e senha', () => {
    renderWithRouter(<Foods />);

    const foodsEl = screen.getByRole('heading', {  name: /foods/i})
    expect(foodsEl).toBeInTheDocument();
  });
  
  it('Verifica se ao clicar no drinks-bottom-btn é redirecionado para página /foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Foods');
   
    const drinkIconEl = screen.getByTestId('drinks-bottom-btn');
    expect (drinkIconEl).toBeInTheDocument();

    userEvent.click(drinkIconEl);
    const { pathname } = history.location;
        expect(pathname).toBe('/drinks');
  });
});