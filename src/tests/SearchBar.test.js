import React from "react";
import { screen, waitFor } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';

import App from "../App";
import mockData from "./helpers/mockData";
import AppProvider from "../context/AppProvider";

describe('Testes com o componente SearchBar na página de Foods', () => {
  beforeEach(() => { 
    const { history } =  renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>
    );
    history.push('/foods');
  })
  
  it('Verifica se ao renderizar o componente Food aparece o botão Search', () => { 
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de pesquisa o container search é renderizado', () => {
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  })
  
  it('Verifica se a api é chamada com o filtro "Ingredient"', async () => {    
    const mockFetch = Promise.resolve({ json: () => Promise.resolve(mockData) });
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    
    const radioBtnIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioBtnIngredient);
    
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'rice');
    
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    userEvent.click(searchBtn);
    
    await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
  })
  
  it('Verifica se a api é chamada com o filtro "firstLetter"', async () => {
    const mockFetch = Promise.resolve({ json: () => Promise.resolve(mockData) });
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const radioBtnFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radioBtnFirstLetter);
    
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 's');
    
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    userEvent.click(searchBtn);
    await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
  });

  it('Verifica se a api é chamada com o filtro "name"', async () => {
    const mockFetch = Promise.resolve({ json: () => Promise.resolve(mockData) });
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const radioBtnFirstLetter = screen.getByTestId('name-search-radio');
    userEvent.click(radioBtnFirstLetter);
    
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 's');
    
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    userEvent.click(searchBtn);
    await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
  })

  it('Verifica exibe um alert "Your search must have only 1 (one) character" caso use o filtro "firstLetter e tenha mais de um character no "searchInput"', async () => {    
    const mockFetch = Promise.resolve({ json: () => Promise.resolve(mockData) });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    
    const alertMock = jest.spyOn(global, 'alert').mockResolvedValue(
      "Your search must have only 1 (one) character"
    ); 
    
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const radioBtnFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radioBtnFirstLetter);
    
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'rice');
    
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    userEvent.click(searchBtn);

    expect(alertMock).toHaveBeenCalledTimes(1);
  })
});

describe('Testes com o componente SearchBar na página de drinks', () => {
  beforeEach(() => { const { history } =  renderWithRouter(
    <AppProvider>
      <App />
    </AppProvider>);
    history.push('/drinks');
  })
  
  it('Verifica se ao renderizar o componente Drink aparece o botão Search', () => { 
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de pesquisa o container search é renderizado', () => {
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  })
    
  it('Verifica se a api é chamada com o filtro "Ingredient"', async () => {
    const mockFetch = Promise.resolve({ json: () => Promise.resolve(mockData) });
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const radioBtnIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioBtnIngredient);
    
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 'suggar');

    const searchBtn = screen.getByRole('button', {  name: /search/i});
    userEvent.click(searchBtn);
    await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
  })

  it('Verifica se a api é chamada com o filtro "firstLetter"', async () => {
    const mockFetch = Promise.resolve({ json: () => Promise.resolve(mockData) });
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const radioBtnFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radioBtnFirstLetter);
    
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 's');
    
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    userEvent.click(searchBtn);
    await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
  })

  it('Verifica se a api é chamada com o filtro "name"', async () => {
    const mockFetch = Promise.resolve({ json: () => Promise.resolve(mockData) });
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const radioBtnFirstLetter = screen.getByTestId('name-search-radio');
    userEvent.click(radioBtnFirstLetter);
    
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'rice');
    
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    userEvent.click(searchBtn);
    await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
  })

  it('Verifica se pesquisado alguma receita que não existe, executa um alert', async () => { 
    const mockFetch = Promise.resolve({ json: () => Promise.resolve(mockData)})
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const alertMock = jest.spyOn(global, 'alert').mockResolvedValue(
      'Sorry, we haven\'t found any recipes for these filters.'
    ); 
    
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const radioBtnName = screen.getByTestId('name-search-radio');
    userEvent.click(radioBtnName);
    
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'asdasd');

    const searchBtn = screen.getByRole('button', {  name: /search/i});
    userEvent.click(searchBtn);
    await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()});
    expect(alertMock).toHaveBeenCalledTimes(1);
  })

  it('Verifica exibe um alert "Your search must have only 1 (one) character" caso use o filtro "firstLetter e tenha mais de um character no "searchInput"', async () => {    
    const mockFetch = Promise.resolve({ json: () => Promise.resolve(mockData) });
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const alertMock = jest.spyOn(global, 'alert').mockResolvedValue(
      "Your search must have only 1 (one) character"
    ); 
    
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const radioBtnFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radioBtnFirstLetter);
    
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'rice');
    
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    userEvent.click(searchBtn);

    await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()});
    expect(alertMock).toHaveBeenCalledTimes(1);
  })
});