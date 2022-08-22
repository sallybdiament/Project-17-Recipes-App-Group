import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } alt="Drink icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/foods">
        <img src={ mealIcon } alt="Meal icon" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
