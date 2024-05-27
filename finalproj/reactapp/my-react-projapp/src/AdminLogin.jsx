import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AdminLogin.css';

const AdminLogin = ( {onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username) {
      setErrorMessage("Username is required");
      return;
    }
    if (!password) {
      setErrorMessage("Password is required");
      return; 
    }
    
    try {
      const response = await fetch('http://127.0.0.1:8000/adminlogin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful!');
        localStorage.setItem('username', username);
        onLogin(username);
        navigate("/Adminpg");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail);
        // Alert if username or password is incorrect
        if (response.status === 401) {
          alert("Username or password is incorrect.");
        }
      }
    } catch (error) {
      alert('Error during login:', error);
    }
  };

  return (
    <div className='parentlogin'>
      <div className='login-container'>
        <form>
          <h2 id='loginn'>Login</h2>
          <label className='login-label' htmlFor='username'>
            Username:
          </label>
          <input
            className='login-input'
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className='login-label' htmlFor='password'>
            Password:
          </label>
          <input
            className='login-input'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button id='loginbtn' className='login-button' type='submit' onClick={handleLogin}>
            Login
          </button>

          {/* Pass username as a prop to Signup component */}
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
