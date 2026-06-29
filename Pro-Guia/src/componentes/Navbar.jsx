import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>ProGuia</h2>
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;