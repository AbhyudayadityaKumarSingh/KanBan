import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import KanbanBoard from './components/KanbanBoard';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Check if token is still valid (dummy check)
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          await axios.get('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } });
        } catch (error) {
          setToken(null);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {token ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <KanbanBoard token={token} />
        </div>
      ) : (
        <div>
          <Register />
          <Login onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default App;
