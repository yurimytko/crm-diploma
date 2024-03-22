import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { SignPage } from './pages/signPage/signPage';
import { DashBoard } from './pages/Dashboard/dashBoard';
import refreshToken from './service/refresh.service';
import { TrucksPage } from './pages/trucks/trucks';

function App() {
  const [token, setToken] = useState();
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('token')).token)

    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      console.log(decoded);
      console.log(token)
    }
    else{
      console.log('Token not found in localStorage');
    }
  }, [token]);

  // const refresh = async () => {
  //   try {
  //     if (token) {
  //       const response = await refreshToken.refresh(token);
  //       setToken(JSON.parse(localStorage.getItem('token')).token);
  //       const decoded = jwtDecode(response.data.token); // Decode the new token
  //       setDecodedToken(decoded); // Update the decodedToken state with the new token's decoded information
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.error('Помилка при оновленні токена:', error);
  //   }
  // };

  //   const checkTokenExpiration = () => {
  //     const currentDateInSeconds = Math.floor((Date.now() - 10000) / 1000);
  
  //     if (currentDateInSeconds >= decodedToken.exp - 20) {
  //       refresh();
  //     }
  //   };

  //   useEffect(() => {
  //     const interval = setInterval(checkTokenExpiration, 20000);
  //     return () => clearInterval(interval);
  //   }, [decodedToken, token]);

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/sign-in"} />} />
          <Route path="/dashboard" element={<DashBoard decode={decodedToken} />} />
          <Route path="/sign-in" element={<SignPage />} />
          <Route path="/trucks" element={<TrucksPage decode={decodedToken}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
