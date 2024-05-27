import React, { useState } from 'react';
import './ContactUs.css';
import Footer from './footer'; // Assuming your file is named 'Footer.js'
import Nav from './Nav';
import { MdEmail } from "react-icons/md";
const ContactUs = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const addquery = async (user) => {
        try {
           const res = await fetch('http://127.0.0.1:8000/contact/', {
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
           } else if (res.status === 400 ) {
             // Handle the case where the username already exists
             // alert(data.detail)
             setErrorMessage(data.detail);
             // You can also use additional logic here, such as redirecting or resetting form fields
           } else {
             console.error('Unexpected error:', data.detail);
           }
         } catch (error) {
           console.error('Error adding user:', error);
         }
       
       };
 const validateInputs=()=>{
  addquery({username:name,  email, message});
  return true;
 }
       const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateInputs()) {
          return;
        }
    
        setErrorMessage('');
      };
  return (
    
    <div id="contmain">
    <Nav/>
  
      <div className="contact-us-container">
        <h2><MdEmail />Email us on:</h2><h2 style={{fontSize:"35px", color:"black"}}>bookbliss@gmail.com</h2><br/><br/>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              className="contfields"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="contfields"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              className="textfields"
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    
      <Footer/>
    </div>
   
  );
};

export default ContactUs;
