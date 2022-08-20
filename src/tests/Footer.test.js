import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";

import Footer from "../components/Footer";

describe('Testes com o componente Footer', () => {
  it('Verifica se o Footer é renderizado ', () => {
    renderWithRouter(<Footer />);

    const footerEl = screen.getByTestId('footer');
    expect(footerEl).toBeInTheDocument();
  });
  it('Verifica se ao renderizar, existe dois componetes de Link', () => {
    renderWithRouter(<Footer />);

    const linksEl = screen.getAllByRole('link');
    expect(linksEl).toHaveLength(2);
  });
  it('Verifica se os Links são representados visualmente por imagens', () => {
    renderWithRouter(<Footer />);

    const drinkIconEl = screen.getByTestId('drinks-bottom-btn');
    expect (drinkIconEl).toBeInTheDocument();

    const mealIconEl = screen.getByTestId('food-bottom-btn');
    expect (mealIconEl).toBeInTheDocument();
  });
});