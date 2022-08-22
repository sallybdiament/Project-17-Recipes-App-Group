import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import Header from "../components/Header";
import userEvent from '@testing-library/user-event';
import App from "../App";

describe('Testes com o componente Footer', () => {
  it('Verifica se o Header é renderizado ', () => {
    renderWithRouter(<Header />);

    const headerProfileTopBtn = screen.getByTestId('profile-top-btn');
    expect(headerProfileTopBtn).toBeInTheDocument();
  });
  it('Verifica se ao renderizar, existe um componetes de Link', () => {
    renderWithRouter(<Header />);

    const linksEl = screen.getAllByRole('link');
    expect(linksEl).toHaveLength(1);
  });
  it('Verifica se o Link é representado visualmente por imagem', () => {
    renderWithRouter(<Header />);

    const profileIconEl = screen.getByTestId('profile-top-btn');
    expect (profileIconEl).toBeInTheDocument();
  });
  it('Verifica se ao clicar no profile-top-btn é representado visualmente por imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const profileIconEl = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIconEl);
    const { pathname } = history.location;
        expect(pathname).toBe('/profile');
  });
});