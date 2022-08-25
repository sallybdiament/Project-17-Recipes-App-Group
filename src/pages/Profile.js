import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

  const history = useHistory();

  function btnOne() {
    history.push('/done-recipes');
  }

  function btnTwo() {
    history.push('/favorite-recipes');
  }

  return (
    <div>
      <Header title="Profile" />
      <div>
        <p data-testid="profile-email">{email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ btnOne }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ btnTwo }
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
