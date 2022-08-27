import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const emailValido = /\S+@\S+\.\S+/;
    const sete = 7;
    if (emailValido.test(form.email) && form.password.length >= sete) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form.email, form.password, form]);

  function handleChange({ target }) {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  function submeter() {
    localStorage.setItem('user', JSON.stringify({ email: form.email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {}, meals: {},
    }));
    history.push('/foods');
  }

  return (
    <div>
      <form>
        <label
          htmlFor="email-input"
        >
          e-mail:
          <input
            type="email"
            data-testid="email-input"
            id="email-input"
            name="email"
            value={ form.email }
            onChange={ handleChange }
          />
        </label>
        <label
          htmlFor="passoword-input"
        >
          senha:
          <input
            type="password"
            data-testid="password-input"
            id="passoword-input"
            name="password"
            value={ form.password }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ submeter }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
