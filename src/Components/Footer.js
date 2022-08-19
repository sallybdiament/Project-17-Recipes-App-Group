import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <button type="button">
        <img src={ drinkIcon } alt="Drink icon" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button">
        <img src={ mealIcon } alt="Meal icon" data-testid="food-bottom-btn" />
      </button>

    </footer>
  );
}

export default Footer;
