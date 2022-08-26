import React from "react";
import { screen, waitFor } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "../App";
import DoneRecipes from "../pages/DoneRecipes";
import AppProvider from "../context/AppProvider";

 const doneRecipes = JSON.stringify([{
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
},
{
  id: '52768',
  // idMeal
  type: 'drink',
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
}]);

describe('Testes com o componente DoneRecipes', () => {
  localStorage.setItem('doneRecipes', doneRecipes);
  // global.copy = jest.fn(() => Promise.resolve({
  //   json: () => Promise.resolve(),
  // }));
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
      </AppProvider>);
      history.push('/done-recipes');
   
    const profileIconEl = screen.getByRole('img', {  name: /ícone de perfil/i});
    expect (profileIconEl).toBeInTheDocument();

    userEvent.click(profileIconEl);
    const { pathname } = history.location;
        expect(pathname).toBe('/profile');
  });
  it('Verifica o filtro "food"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const foodFilter = await screen.findByTestId('filter-by-food-btn');
    userEvent.click(foodFilter);

    const recipesTitles = await screen.findAllByTestId(/-horizontal-name/);
    expect(recipesTitles.length).toBe(1);
  });
  it('Verifica o filtro "drink"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const drinkFilter = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilter);

    const recipesTitles = await screen.findAllByTestId(/-horizontal-name/);
    expect(recipesTitles.length).toBe(1);
  });
  it('Verifica o filtro "all"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const allFilter = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(allFilter);

    const recipesTitles = await screen.findAllByTestId(/-horizontal-name/);
    expect(recipesTitles.length).toBe(2);
  });
  it('Se ao clicar no copy, ele aparece o texto "Link copied"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const copyIcon = await screen.findAllByRole('img', {  name: /share button/i})
    userEvent.click(copyIcon[0]);


    // const linkCopiedText = await screen.findByRole('button', {  name: /link copied!/i})
    const linkCopiedText = await screen.findByText(/link copied/i)
    expect(linkCopiedText).toBeInTheDocument();
    // expect(global.copy).toHaveBeenCalled(1);
  });

  it('Verifica caso o localStorage esteja vazio', async () => {
    localStorage.removeItem('doneRecipes');
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const recipesTitles = await screen.queryByTestId('0-horizontal-name');
    expect(recipesTitles).not.toBeInTheDocument();
  });
});



