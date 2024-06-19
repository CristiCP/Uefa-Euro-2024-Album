import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import PackOpener from './Components/PackOpener';
import LoginPage from './Components/Login/LoginPage';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/packing" element={<PackOpener></PackOpener>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </Router>
  )
}

export default App
