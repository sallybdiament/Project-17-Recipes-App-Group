import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import Drinks from "../pages/Drinks";

describe('Testes com o componente Drinks', () => {
  // it('Verifica se ao renderizar o componente Drinks aparece o título Drinks', () => {
  // //   renderWithRouter(<Drinks />);
 
  //   const headingDrinkEl = screen.getByRole('heading', {  name: /drinks/i})
  //   expect(headingDrinkEl).toBeInTheDocument();
  // });
  
  // it('Verifica se ao clicar no food-bottom-btn é redirecionado para página /foods', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/Drinks');
   
  //   const profileIconEl = screen.getByRole('img', {  name: /ícone de perfil/i});
  //   expect (profileIconEl).toBeInTheDocument();

  //   userEvent.click(profileIconEl);
  //   const { pathname } = history.location;
  //       expect(pathname).toBe('/profile');
  // });
});