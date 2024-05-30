import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { SignPage } from './pages/signPage/signPage';
import { DashBoard } from './pages/Dashboard/dashBoard';
import refreshToken from './service/refresh.service';
import { TrucksPage } from './pages/trucks/trucks';
import { Workers } from './pages/Workers/workers';
import { Transfer } from './pages/Transfer/transfer';
import { Map } from './pages/Map/map';


function App() {
  const [token, setToken] = useState();
  const [decodedToken, setDecodedToken] = useState(null);




  const refreshTokenf = async () => {
    if (token) {
      await refreshToken.refresh(token);
      console.log(token);
    } else {
      console.log('Token not found');
    }
  };

  

  useEffect(() => {
    let intervalId;
  
    if(localStorage.getItem("token")) {
      setToken(JSON.parse(localStorage.getItem('token')).token);
    }
  
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    } else {
      console.log('Token not found in localStorage');
    }
  
    if (intervalId) {
      clearInterval(intervalId);
    }
  
    intervalId = setInterval(refreshTokenf, 9 * 60 * 1000);
  
    return () => clearInterval(intervalId);
  }, [token]);


  return (

      <div className='App'>
        <Router>
          <Routes>
          <Route path="/" element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/sign-in"} />} />
            <Route path="/dashboard" element={<DashBoard decode={decodedToken} />} />
            <Route path="/sign-in" element={<SignPage />} />
            <Route path="/trucks" element={<TrucksPage decode={decodedToken}/>}/>
            <Route path='/workers' element = {<Workers decode = {decodedToken}/>}/>
            <Route path = '/transfers' element = {<Transfer decode = {decodedToken}/>}/>
            <Route path ='/map' element = {<Map/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
