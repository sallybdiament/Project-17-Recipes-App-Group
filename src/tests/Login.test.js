import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import Login from "../pages/Login";

describe('Testes com o componente Login', () => {
  beforeEach(() => { const { history } =  renderWithRouter(
    <AppProvider>
    <App />
    </AppProvider>);
    // history.push('/');
})
  it('Verifica se ao renderizar o componente Login aparecem os inputs de email e senha', () => {

    const emailInut = screen.getByTestId('email-input');
    expect(emailInut).toBeInTheDocument();
    
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    const loginBtn = screen.getByTestId('login-submit-btn');
    expect(loginBtn).toBeInTheDocument();
  });
  
  // it('Verifica se ao clicar no login-submit-btn é redirecionado para página /foods', () => {
  //   const { history } = renderWithRouter(<App />);
  //   // history.push('/');
   
  //   const testEmail = 'test@email.com';
  //   const testPassword = '123456';

  //   const emailInut = screen.getByTestId('email-input');
  //   const passwordInput = screen.getByTestId('password-input');

  //   userEvent.type(emailInut, testEmail);
  //   userEvent.type(passwordInput, testPassword);
    
  //   const loginBtn = screen.getByTestId('login-submit-btn');
  //   userEvent.click(loginBtn);
  //   const { pathname } = history.location;
  //       expect(pathname).toBe('/foods');
  // });
});