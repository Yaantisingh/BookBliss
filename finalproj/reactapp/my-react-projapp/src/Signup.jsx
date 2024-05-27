import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('@gmail.com');
  const [phone, setPhone] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [pincode, setPincode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const adduser = async (user) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/user/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (res.status === 200) {
        console.log(data.message);
        alert(data.message);
        navigate("/")
      } else if (res.status === 400) {
        setErrorMessage(data.detail);
      } else {
        console.error('Unexpected error:', data.detail);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const validateInputs = () => {
    if (
      !username.trim() ||
      !password.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !selectedCountryCode ||
      !state.trim() ||
      !district.trim() ||
      !houseNo.trim() ||
      !street.trim() ||
      !pincode.trim()
    ) {
      setErrorMessage('All fields are required.');
      return false;
    }
    if (!/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,20}$/.test(password)) {
      setErrorMessage('Password must be 8-20 characters long and contain at least one digit and one special character.');
      return false;
    }
    if (!validatePhoneNumber(phone)) {
      setErrorMessage('Phone number must be a 10-digit number.');
      return false;
    }
    adduser({ username, password, email, phone, house_num: houseNo, street_name: street, district, pincode, state });
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    setErrorMessage('');
  };

  const countries = [
    { name: '(USA)', code: '+1' },
    { name: 'Canada', code: '+1' },
    { name: ' (UK)', code: '+44' },
    { name: 'Australia', code: '+61' },
    { name: 'France', code: '+33' },
    { name: 'Germany', code: '+49' },
    { name: 'Japan', code: '+81' },
    { name: 'China', code: '+86' },
    { name: 'India', code: '+91' },
    { name: 'Brazil', code: '+55' },
  ];

  const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  return (
    <>
      <h2 id="sign_form">Signup</h2>
      <div className='container'>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className='labels'>Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label className='labels'>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={20}
              required />
          </div>
          <div className="form-group">
            <small>Password must be 8-20 characters long with at least one digit and one special character.</small>
          </div>
          <div className="form-group">
            <label className='labels'>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group row">
            <label className="col-3 col-form-label text-right labels">Phone:</label>
            <div className="input-group col-9">
              <select
                className="custom-select"
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)} >
                <option value="">Country Code</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.code}>{country.name} ({country.code})</option>
                ))}
              </select>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className='labels'>House No.:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter house number"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)} />
          </div>
          <div className="form-group">
            <label className='labels'>Street Name :</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter street name"
              value={street}
              onChange={(e) => setStreet(e.target.value)} />
          </div>
          <div className="form-group col-md-6">
            <label className='labels'>District:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)} />
          </div>
          <div className="form-group col-md-6">
            <label className='labels'>Pincode:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)} />
          </div>
          <div className="form-group">
            <label className='labels'>State:</label>
            <select
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)} >
              <option value="">Select State</option>
              {statesOfIndia.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button type="submit" id="signupbtn" className="login-button" >Signup</button>
            <button id="signupbtn" className="login-button" onClick={() => navigate('/Loginpg')}>Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
