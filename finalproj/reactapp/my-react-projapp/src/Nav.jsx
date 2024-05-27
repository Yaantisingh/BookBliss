

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaEye, FaUser } from 'react-icons/fa'; 
import { IoHome } from "react-icons/io5";
import './Nav.css';

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav id='nav'>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Close icon */}
        <div className="close-icon" onClick={toggleSidebar}>
          <FaTimes />
        </div>
        {/* Sidebar Content Goes Here */}
        <ul>
          <li><Link to="/AdminLogin" onClick={toggleSidebar}>Admin</Link></li>
          <li><Link to="/BookListByAuthor" onClick={toggleSidebar}>Search By Aurthor</Link></li>
          <li><Link to="/Catrelg" onClick={toggleSidebar}>Search by Category</Link></li>
          <li><Link to="/Aboutpg" onClick={toggleSidebar}>About Us</Link></li>
          <li><Link to="/ContactUs" onClick={toggleSidebar}>Contact Us</Link></li>
          <li><Link to="/Logout" onClick={toggleSidebar}>Logout</Link></li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>

      <div className="navbar">
        <div className="navbar-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </div>
        <h2 id="A1">
          <img src={'/images/bookbliss_logo.jpeg'} alt="Example" />
          </h2>
        <h3 id="I"><Link to="/"><IoHome/> Home</Link></h3>
        <h3 id="G"><Link to="/Product"><FaEye/> Books</Link></h3> 
        <h3 id="F"><Link to="/Loginpg"><FaUser /> Login</Link></h3> 
        <h3 id="H"><Link to="/CartItems"> <FaShoppingCart color="white" size={30}  /></Link></h3>
      </div>
    </nav>
  );
};

export default Nav;
