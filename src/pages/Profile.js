import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  return (
    <div>
      <Header title="Profile" />
      <div>
        <p data-testid="profile-email">email</p>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
