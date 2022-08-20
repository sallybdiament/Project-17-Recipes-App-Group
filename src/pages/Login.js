import React from 'react';

function Login() {
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
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
