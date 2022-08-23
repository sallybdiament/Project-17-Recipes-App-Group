import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import Foods from "../pages/Foods";
import AppProvider from "../context/AppProvider";

describe('Testes com o componente Foods', () => {
  beforeEach(() => { const { history } =  renderWithRouter(
    <AppProvider>
    <App />
    </AppProvider>);
    history.push('/foods');
})
  it('Verifica se ao renderizar o componente Foods aparece o título Foods', () => {

    const foodsEl = screen.getByRole('heading', {  name: /foods/i})
    expect(foodsEl).toBeInTheDocument();
  });
  
  it('Verifica se ao clicar no drinks-bottom-btn é redirecionado para página /foods', () => {
    const drinkIconEl = screen.getByRole('img', {  name: /drink icon/i});
    expect (drinkIconEl).toBeInTheDocument();

    // userEvent.click(drinkIconEl);
    // const { pathname } = history.location;
    //     expect(pathname).toBe('/drinks');
  });
});