import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event'

import Header from "../components/Header";
import AppProvider from "../context/AppProvider";
import App from "../App";


describe('Testes do componente Header', () => {
  beforeEach(() => { const { history } =  renderWithRouter(
    <AppProvider>
    <App />
    </AppProvider>);
    history.push('/drinks');
})
  it('Verifica se os elementos padrão são renderizados', () => {
    renderWithRouter(<Header title="Foods" />);

    const profileLink = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profileLink).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('Verifica se o botão de pesquisa', async () => {
    renderWithRouter(<Header title="Foods" />);

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    expect(await screen.findByTestId('search-input')).toBeInTheDocument();
  });
});