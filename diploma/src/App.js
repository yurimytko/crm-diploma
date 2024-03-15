import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { SignPage } from './pages/signPage/signPage';
import { DashBoard } from './pages/Dashboard/dashBoard';
import refreshToken from './service/refresh.service';
import { TrucksPage } from './pages/trucks/trucks';

function App() {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken).token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      console.log(decoded);
    }
  }, [token]);

  const refresh = async () => {
    try {
      if (token) {
        await refreshToken.refresh(token);
      }
    } catch (error) {}
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashBoard decode={decodedToken} />} />
          <Route path="/sign-in" element={<SignPage />} />
          <Route path="/trucks" element={<TrucksPage decode={decodedToken}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
