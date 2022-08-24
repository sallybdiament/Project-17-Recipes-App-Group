import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import App from "../App";
import DoneRecipes from "../pages/DoneRecipes";
import AppProvider from "../context/AppProvider";

 const data = [{
    id: '52768',
    // idMeal
    type: 'food',
    nationality: 'British',
    // strArea
    category: 'Dessert',
    // strCategory
    alcoholicOrNot: '',
    // strDrinkAlternate
    name: 'Apple Frangipan Tart',
    // strMeal
    image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
    // strMealThumb
    doneDate: '2/2/22',
    // "dateModified": null
    tags: ['Tart', 'Baking', 'Fruity'],
    // "strTags": "Tart,Baking,Fruity",
  }];

// https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b
describe("DoneRecipes tests", () => {
  const fakeAxios = {
    get: jest.fn(() => Promise.resolve({doneRecipes: data}))
  };

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });
  
  it("Should call localStorage getItem on render", () => {
    const { history } =  renderWithRouter(
      <AppProvider>
      <App axios={fakeAxios} />
      </AppProvider>);
      history.push('/done-recipes');

    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });
});

https://thewebdev.info/2022/02/24/how-to-mock-local-storage-in-jest-tests/
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Testes com o componente DoneRecipes', () => {
  it('Verifica se ao renderizar o componente DoneRecipes aparecem o título Done Recipes', () => {
    const { history } =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);
      history.push('/done-recipes');

    const doneRecipesEl = screen.getByRole('heading', {  name: /done recipes/i})
    expect(doneRecipesEl).toBeInTheDocument();

    const buttonsEl = screen.getAllByRole('button');
    expect(buttonsEl).toHaveLength(3);
  });
  
  it('Verifica se ao clicar no food-bottom-btn é redirecionado para página /foods', () => {
    const { history } =  renderWithRouter(
      <AppProvider>
      <App />
      </AppProvider>);q
      history.push('/done-recipes');
   
    const profileIconEl = screen.getByRole('img', {  name: /ícone de perfil/i});
    expect (profileIconEl).toBeInTheDocument();

    userEvent.click(profileIconEl);
    const { pathname } = history.location;
        expect(pathname).toBe('/profile');
  });
});