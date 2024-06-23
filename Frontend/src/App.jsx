import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/Home/HomePage';
import Navbar from './Components/Navbar';
import StorePage from './Components/Store/StorePage';
import LoginPage from './Components/Login/LoginPage';
import AlbumPage from './Components/Album/AlbumPage';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/packing" element={<StorePage></StorePage>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/album' element={<AlbumPage></AlbumPage>}></Route>
      </Routes>
    </Router>
  )
}

export default App
