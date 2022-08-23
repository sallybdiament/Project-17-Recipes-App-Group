import React, { useEffect, useState } from 'react';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [disabled, setDisabled] = useState(true);

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
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
