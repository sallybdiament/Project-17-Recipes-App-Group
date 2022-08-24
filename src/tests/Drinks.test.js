import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import Drinks from "../pages/Drinks";
import AppProvider from "../context/AppProvider";

describe('Testes com o componente Drinks', () => {
  beforeEach(() => { const { history } =  renderWithRouter(
    <AppProvider>
    <App />
    </AppProvider>);
    history.push('/drinks');
  })
  it('Verifica se ao renderizar o componente Drinks aparece o título Drinks', () => {
    const headingDrinkEl = screen.getByRole('heading', {  name: /drinks/i})
    expect(headingDrinkEl).toBeInTheDocument();
  });
  it('Verifica se o ícone de comidas do footer aparece em /foods', () => {
    const foodIconEl = screen.getByRole('img', {  name: /meal icon/i});
    expect (foodIconEl).toBeInTheDocument();
  });
});

  describe('Testes com o componente Drinks', () => {
  it('Verifica se ao clicar no profile é redirecionado para página /foods', () => {
    const { history } =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      history.push('/drinks');

    const profileIconEl = screen.getByRole('img', {  name: /ícone de perfil/i});
    expect (profileIconEl).toBeInTheDocument();

    userEvent.click(profileIconEl);
    const { pathname } = history.location;
        expect(pathname).toBe('/profile');
  });
});

describe('Testes com o componente Drinks', () => {
  it('Verifica se ao clicar no food-bottom-btn é redirecionado para página /foods', () => {
    const { history } =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      history.push('/drinks');

    const foodIconEl = screen.getByRole('img', {  name: /meal icon/i});
    expect (foodIconEl).toBeInTheDocument();

    userEvent.click(foodIconEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});