import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUsername }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Log out the user immediately upon rendering the component
    localStorage.removeItem('username');
    setUsername('');
    navigate('/'); // Redirect to the home page
  }, [navigate, setUsername]); // Include navigate and setUsername in the dependency array

  // Return null as the component doesn't render anything
  return null;
};

export default Logout;
