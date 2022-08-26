import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import AppProvider from "../context/AppProvider";

describe('Testes com o componente Profile', () => {

  it('Verifica se possui um email', () => {
    const {history} =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>
      );
      history.push('/profile');
      const email = screen.getByTestId(/profile-email/i)
      expect(email).toBeInTheDocument();
  });
  it('Verifica se possui 3 botões', () => {
    const {history} =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      history.push('/profile');
      const btns = screen.getAllByRole('button')
      expect(btns).toHaveLength(3);
  });
  it('Verifica se o Done Recipes funciona', () => {
    const {history} =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      const inputEmail = screen.getByTestId(/email-input/i);
      const password = screen.getByTestId(/password-input/i);
      userEvent.type(inputEmail, 'teste@rapido.com');
      userEvent.type(password, '1234567');
      const enter = screen.getByTestId(/login-submit-btn/i);
      userEvent.click(enter);
      const profileLink = screen.getByTestId('profile-top-btn');
      userEvent.click(profileLink);
      const done = screen.getByTestId(/profile-done-btn/i);
      userEvent.click(done);
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
  });
  it('Verifica se o Favorite Recipes funciona', () => {
    const {history} =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      history.push('/profile');
      const fav = screen.getByRole('button', { name: /favorite recipes/i });
      userEvent.click(fav);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorite-recipes');
  });
  it('Verifica se o Logout funciona', () => {
    const {history} =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      history.push('/profile');
      const logout = screen.getByTestId(/profile-logout-btn/i);
      userEvent.click(logout);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
  });
});