import React, { useContext } from "react";
import { screen, waitFor } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import Foods from "../pages/Foods";
import mockData from "./helpers/mockData";
import AppContext from "../context/AppContext";
import AppProvider from "../context/AppProvider";
import mockDataDrinks from "./helpers/mockDataDrinks";

describe('Testes com o componente SearchBar e Foods', () => {
  beforeEach(() => { const { history } =  renderWithRouter(
    <AppProvider>
    <App />
    </AppProvider>);
    history.push('/foods');
})
    it('Verifica se ao renderizar o componente Food aparece o botão Search', () => {
    const searchBtn = screen.getByRole('button', {  name: /search/i})
    expect(searchBtn).toBeInTheDocument();
  });
  
  test('se a api é chamda', async () => {
    const mockFetch = Promise.resolve({
    json: () => Promise.resolve(mockData),
    })
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const searchInputShow = screen.getByRole('img', {  name: /ícone de pesquisa/i})
    const radioBtnIngredient = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    
    userEvent.click(searchInputShow);
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 'rice');
    userEvent.click(radioBtnIngredient);
    userEvent.click(searchBtn);
   await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
})
test('se a api é chamda', async () => {
    const mockFetch = Promise.resolve({
    json: () => Promise.resolve(mockData),
    })
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const searchInputShow = screen.getByRole('img', {  name: /ícone de pesquisa/i})
    const radioBtnFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    
    userEvent.click(searchInputShow);
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 's');
    userEvent.click(radioBtnFirstLetter);
    userEvent.click(searchBtn);
   await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
})
test('se a api é chamda', async () => {
    const mockFetch = Promise.resolve({
    json: () => Promise.resolve(mockData),
    })
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const searchInputShow = screen.getByRole('img', {  name: /ícone de pesquisa/i})
    const radioBtnFirstLetter = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    
    userEvent.click(searchInputShow);
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 's');
    userEvent.click(radioBtnFirstLetter);
    userEvent.click(searchBtn);
   await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
})
});

describe('Testes com o componente SearchBar e drinks', () => {
    beforeEach(() => { const { history } =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      history.push('/drinks');
  })
      it('Verifica se ao renderizar o componente Drinks aparece o botão Search', () => {
      const searchBtn = screen.getByRole('button', {  name: /search/i})
      expect(searchBtn).toBeInTheDocument();
    });
    
    test('se a api é chamda', async () => {
      const mockFetch = Promise.resolve({
      json: () => Promise.resolve(mockData),
      })
      const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
      const searchInputShow = screen.getByRole('img', {  name: /ícone de pesquisa/i})
      const radioBtnIngredient = screen.getByTestId('ingredient-search-radio');
      const searchBtn = screen.getByRole('button', {  name: /search/i});
      
      userEvent.click(searchInputShow);
      const inputValue = screen.getByRole('textbox');
      userEvent.type(inputValue, 'suggar');
      userEvent.click(radioBtnIngredient);
      userEvent.click(searchBtn);
     await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
  })
  test('se a api é chamda', async () => {
    const mockFetch = Promise.resolve({
    json: () => Promise.resolve(mockData),
    })
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const searchInputShow = screen.getByRole('img', {  name: /ícone de pesquisa/i})
    const radioBtnFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    
    userEvent.click(searchInputShow);
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 's');
    userEvent.click(radioBtnFirstLetter);
    userEvent.click(searchBtn);
   await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
})
test('se a api é chamda com meals', async () => {
    const mockFetch = Promise.resolve({
    json: () => Promise.resolve(mockData),
    })
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const searchInputShow = screen.getByRole('img', {  name: /ícone de pesquisa/i})
    const radioBtnName = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    
    userEvent.click(searchInputShow);
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 'rice');
    userEvent.click(radioBtnName);
    userEvent.click(searchBtn);
   await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
})
test('se a api é chamda com meals', async () => {
    const mockFetch = Promise.resolve({
    json: () => Promise.resolve(mockData),
    })
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const searchInputShow = screen.getByRole('img', {  name: /ícone de pesquisa/i})
    const radioBtnFirstLetter = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    
    userEvent.click(searchInputShow);
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 'sasd');
    userEvent.click(radioBtnFirstLetter);
    userEvent.click(searchBtn);
   await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
})
test('se a api é chamda com meals e retorna o alert de que não encontrado nada', async () => {
    const alertMock = jest.spyOn(global,'alert').mockImplementation(); 
    const mockFetch = Promise.resolve({
    json: () => Promise.resolve(mockData),
    })
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const searchInputShow = screen.getByRole('img', {  name: /ícone de pesquisa/i})
    const radioBtnName = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    
    userEvent.click(searchInputShow);
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 'asdasd');
    userEvent.click(radioBtnName);
    userEvent.click(searchBtn);
   await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
   expect(alertMock).toHaveBeenCalledTimes(1);
})
test('se a api é chamda com mockDataDrinks', async () => {
    const mockFetch = Promise.resolve({
    json: () => Promise.resolve(mockDataDrinks),
    })
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const searchInputShow = screen.getByRole('img', {  name: /ícone de pesquisa/i})
    const radioBtnFirstLetter = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    
    userEvent.click(searchInputShow);
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 's');
    userEvent.click(radioBtnFirstLetter);
    userEvent.click(searchBtn);
   await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
})
test('se a api é chamda com mockDataDrinks e da o alert de que só pode digitar uma letra', async () => {
    const mockFetch = Promise.resolve({
    json: () => Promise.resolve(mockDataDrinks),
    })
    const mockedAPI = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
    const searchInputShow = screen.getByRole('img', {  name: /ícone de pesquisa/i})
    const radioBtnFirstLetter = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', {  name: /search/i});
    
    userEvent.click(searchInputShow);
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 'ssdasd');
    userEvent.click(radioBtnFirstLetter);
    userEvent.click(searchBtn);
   await waitFor(() => {expect(mockedAPI).toHaveBeenCalled()}) ;
})

  });

