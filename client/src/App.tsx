import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from './Pages/Home';
import RegisterTask from './Pages/RegisterTask';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path="/" element={<RegisterTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
