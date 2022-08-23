import { number, string } from 'prop-types';
import React from 'react';
import '../styles/Card.css';

export default function Card({ index, image, name }) {
  return (
    <div className="card-container" data-testid={ `${index}-recipe-card` }>
      <img
        src={ image }
        alt={ `${name}` }
        className="card-image"
        data-testid={ `${index}-card-img` }
      />
      <p className="card-name" data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

Card.propTypes = {
  index: number.isRequired,
  image: string.isRequired,
  name: string.isRequired,
};
