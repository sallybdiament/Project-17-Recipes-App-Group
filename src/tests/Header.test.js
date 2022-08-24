import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event'
import AppProvider from "../context/AppProvider";

import App from "../App";

describe('Testes do componente Header', () => {

  it('Verifica se os elementos padrão são renderizados', () => {
    const { history } =  renderWithRouter(
      <AppProvider> 
        <App /> 
      </AppProvider>
    );
    history.push('/drinks');  
    
    const profileLink = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(profileLink).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('Verifica se ao clicar no link profile é direcinado para página de perfil', () => {
    const { history } =  renderWithRouter(
      <AppProvider> 
        <App /> 
      </AppProvider>
    );
    history.push('/drinks');
    
    const profileLink = screen.getByTestId('profile-top-btn');
    userEvent.click(profileLink);
    const {location: { pathname }} = history;
    
    expect(pathname).toBe('/profile')
  });



  it('Verifica se o botão de pesquisa abre o container de search', async () => {
    const { history } =  renderWithRouter(
      <AppProvider> 
        <App /> 
      </AppProvider>
    );
    history.push('/drinks');
    
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    expect(await screen.findByTestId('search-input')).toBeInTheDocument();
  });
});