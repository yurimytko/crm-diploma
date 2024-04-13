import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { SignPage } from './pages/signPage/signPage';
import { DashBoard } from './pages/Dashboard/dashBoard';
import refreshToken from './service/refresh.service';
import { TrucksPage } from './pages/trucks/trucks';
import { Workers } from './pages/Workers/workers';


function App() {
  const [token, setToken] = useState();
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if(localStorage.getItem("token")){
      setToken(JSON.parse(localStorage.getItem('token')).token)
    }

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


  return (

      <div className='App'>
        <Router>
          <Routes>
          <Route path="/" element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/sign-in"} />} />
            <Route path="/dashboard" element={<DashBoard decode={decodedToken} />} />
            <Route path="/sign-in" element={<SignPage />} />
            <Route path="/trucks" element={<TrucksPage decode={decodedToken}/>}/>
            <Route path='/workers' element = {<Workers decode = {decodedToken}/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
