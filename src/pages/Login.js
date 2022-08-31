import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Image } from 'react-bootstrap';

function Login() {
  const history = useHistory();
  const [form, setForm] = useState({ email: '', password: '' });
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

  function submeter() {
    localStorage.setItem('user', JSON.stringify({ email: form.email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {}, meals: {},
    }));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    history.push('/foods');
  }

  return (
    <div className="login-container">
      <Form className="d-flex flex-column p-4 justify-content-center vh-100">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control
            type="email"
            name="email"
            id="email-input"
            placeholder="Email adress"
            data-testid="email-input"
            value={ form.email }
            onChange={ (e) => handleChange(e) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type="password"
            name="password"
            id="passoword-input"
            placeholder="Password"
            data-testid="password-input"
            value={ form.password }
            onChange={ (e) => handleChange(e) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remeber me" />
        </Form.Group>
        <Button
          className=""
          variant="success"
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ () => submeter() }
        >
          Enter
        </Button>
      </Form>
    </div>
  );
}

export default Login;
