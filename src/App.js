import './App.css';
import to from 'await-to-js';
import DeroBridgeApi from 'dero-rpc-bridge-api';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';

const App = () => {
  const deroBridgeApiRef = useRef();
  const [bridgeInitText, setBridgeInitText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const load = async () => {
      deroBridgeApiRef.current = new DeroBridgeApi()
      const deroBridgeApi = deroBridgeApiRef.current
      const [err] = await to(deroBridgeApi.init())
      if (err) {
        setBridgeInitText('failed to connect to extension')
      } else {
        setBridgeInitText('connected to extension')
      }
    }

    window.addEventListener('load', load)
    return () => window.removeEventListener('load', load)
  }, [])


  const handleLogin = useCallback(async (name) => {
    const deroBridgeApi = deroBridgeApiRef.current;
    const [err, res] = await to(deroBridgeApi.daemon('name-to-address', { name }));
    if (err) {
      alert(err.message);
    } else {
      const isValidAddress = res.data.result.status === "OK";
      if (isValidAddress) {
        setIsLoggedIn(true);
        history.push('/HomePage');
      } else {
        alert('Invalid address');
      }
    }
  }, [history]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    history.push('/LoginPage');
  }, [history]);

  const renderPage = useCallback(() => {
    if (isLoggedIn) {
      return <HomePage handleLogout={handleLogout} />;
    } else {
      return <LoginPage handleLogin={handleLogin} />;
    }
  }, [isLoggedIn, handleLogout, handleLogin]);

  // Initialize DeroBridgeApi on component mount
  useEffect(() => {
    const load = async () => {
      deroBridgeApiRef.current = new DeroBridgeApi();
      const deroBridgeApi = deroBridgeApiRef.current;
      const [err] = await to(deroBridgeApi.init());
      if (err) {
        setBridgeInitText('Failed to connect to bridge');
      } else {
        setBridgeInitText('Connected to bridge');
      }
    };
    load();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <p>{bridgeInitText}</p>
        {renderPage()}
      </div>
    </BrowserRouter>
  );
};

export default App;
