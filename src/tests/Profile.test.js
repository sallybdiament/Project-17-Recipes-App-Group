import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import Profile from "../pages/Profile";

describe('Testes com o componente Profile', () => {
  it('Verifica se ao renderizar o componente Profile aparecem os inputs de email e senha', () => {
    renderWithRouter(<Profile />);

    const headingProfileEl = screen.getByRole('heading', {  name: /profile/i})
    expect(headingProfileEl).toBeInTheDocument();
  });
  
  it('Verifica se ao clicar no food-bottom-btn é redirecionado para página /foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Profile');
   
    const mealIconEl = screen.getByTestId('food-bottom-btn');
    expect (mealIconEl).toBeInTheDocument();

    userEvent.click(mealIconEl);
    const { pathname } = history.location;
        expect(pathname).toBe('/foods');
  });
});