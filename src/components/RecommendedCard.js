import { number, string } from 'prop-types';
import React from 'react';
import '../styles/Card.css';

export default function RecommendedCard({ index, image, name }) {
  return (
    <div
      key={ index }
      className="card-container"
      data-testid={ `${index}-recomendation-card` }
    >
      <img
        src={ image }
        alt={ `${name}` }
        className="card-image"
        data-testid={ `${index}-card-img` }
      />
      <p
        className="card-name"
        data-testid={ `${index}-recomendation-title` }
      >
        { name }
      </p>
    </div>
  );
}

RecommendedCard.propTypes = {
  index: number.isRequired,
  image: string.isRequired,
  name: string.isRequired,
};
