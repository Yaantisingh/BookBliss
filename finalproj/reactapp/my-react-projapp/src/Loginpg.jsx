import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Loginpg.css";

const Loginpg = ({ onLogin }) => { 
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await fetch('http://127.0.0.1:8000/login/', {
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
        navigate("/");
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
      <div className="login-container">
        <form>
          <h2 id="loginn">Login</h2>
          <label className="login-label" htmlFor="username">Username:</label>
          <input
            className="login-input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="login-label" htmlFor="password">Password:</label>
          <input
            className="login-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            id="loginbtn"
            className="login-button"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className='register-link' onClick={()=>navigate('/Signup')}>Don't have an account? Register Now</p>
          {/* <button id="signupbtn" className="login-button" onClick={() => navigate('/Signup')}>Sign-Up</button> */}
        </form>
        {errorMessage && <p className="logerror-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Loginpg;
