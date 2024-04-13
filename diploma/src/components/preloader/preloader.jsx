import React, { useState, useEffect } from 'react';
import "./dist/preloader.css"

export function Preloader() {
    return (
    <div className="preloader">
        <div className="spinner"></div>
        <h1 className='loader_text'>LOADING...</h1>
    </div>)

};

