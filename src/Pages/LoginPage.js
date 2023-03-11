import React, { useState } from 'react';

const LoginPage = ({ handleLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(name);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginPage;
