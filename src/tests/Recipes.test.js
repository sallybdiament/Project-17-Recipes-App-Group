import React from "react";
import { screen, waitFor } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event'

import Recipes from "../components/Recipes";

describe('Testes do componente Recipes', () => {
  it('Verifica se os elementos padrão são renderizados "Foods"', async () => {
    renderWithRouter(<Recipes type="meals" />);

    await waitFor(() => expect(screen.getAllByTestId(/-category-filter/)).toHaveLength(6));

    const recipeCards = await screen.findAllByTestId(/-recipe-card/);
    expect(recipeCards.length).toBe(12);
  });

  it('Verifica se os elementos padrão são renderizados "Drinks"', async () => {
    renderWithRouter(<Recipes type="drinks" />);

    await waitFor(() => expect(screen.getAllByTestId(/-category-filter/)).toHaveLength(6));

    const recipeCards = await screen.findAllByTestId(/-recipe-card/);
    expect(recipeCards.length).toBe(12);
  });

  it('Verifica os filtros "Drinks"', async () => {
    renderWithRouter(<Recipes type="drinks" />);

    const filterButton = await screen.findByTestId('Cocktail-category-filter');
    const GG = await screen.findByText('GG');
    userEvent.click(filterButton);
    waitFor(() => expect(GG).not.toBeInTheDocument());
    expect(await screen.findByText('155 Belmont')).toBeInTheDocument();
    userEvent.click(filterButton);
    waitFor(() => expect(GG).toBeInTheDocument());
  });

  it('Verifica os filtros "Foods"', async () => {
    renderWithRouter(<Recipes type="meals" />);

    const filterButton = await screen.findByTestId('Beef-category-filter');
    const corba = await screen.findByText('Corba');
    userEvent.click(filterButton);
    waitFor(() => expect(corba).not.toBeInTheDocument());
    expect(await screen.findByText('Beef and Mustard Pie')).toBeInTheDocument();
    userEvent.click(filterButton);
    waitFor(() => expect(corba).toBeInTheDocument());
  });

});