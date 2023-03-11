import React from 'react';

const HomePage = ({ handleLogout }) => {
  return (
    <div>
      <h1>HOME PAGE</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default HomePage;