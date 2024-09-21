import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Navbar from './navbar/Navbar';
import Registers from './Pages/Registers';
import Home from './Pages/Home';
import Task from './Pages/Task';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Registers />}/>
            <Route path='/home' element={<Home/>}/>
            <Route path="/create-Task" element={<Task />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
