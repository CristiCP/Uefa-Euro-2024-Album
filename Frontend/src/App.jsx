import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/Home/HomePage';
import Navbar from './Components/Navbar';
import StorePage from './Components/Store/StorePage';
import LoginPage from './Components/Login/LoginPage';
import AlbumPage from './Components/Album/AlbumPage';
import PrivateRoute from './Components/PrivateRoute';
import ValidationPage from './Components/Login/ValidationPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/packing" element={
          <PrivateRoute>
            <StorePage />
          </PrivateRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/album" element={
          <PrivateRoute>
            <AlbumPage />
          </PrivateRoute>
        } />
        <Route path="/verify" element={<ValidationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
