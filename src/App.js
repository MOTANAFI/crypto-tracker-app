
import React from 'react';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoinPage from './Pages/CoinPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
     
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route path="/coin/:id" element = {<CoinPage/>}/>
      
      </Routes>
    </Router>
  );
}

export default App;
