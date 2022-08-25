import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const [email, setEmail] = useState('');

  function recuperaEmail() {
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);
  }

  useEffect(() => {
    recuperaEmail();
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <div>
        <p data-testid="profile-email">{email}</p>
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
