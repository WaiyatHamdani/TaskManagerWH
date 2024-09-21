import React from 'react';
import '../CSS/navbar.css'; 
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar" >
          <Link to="/create-Task"><img src="/WaiyatTask.jpg" alt="Logo" className="Task" /></Link>
          <div className='navbutton' ><Link to="/home" style={{ textDecoration: 'none' }}> <h5>home</h5></Link></div> 
          <div className='navbutton' ><Link to="/Explore" style={{ textDecoration: 'none' }}><h5>Explore</h5></Link></div>         
    </div>
  );
}

export default Navbar;