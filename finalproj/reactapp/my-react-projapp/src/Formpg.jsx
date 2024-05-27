import React from 'react'
import {useState} from "react";

const Formpg = () => {
    const [formData,setFormData]=useState({
      username:'',
      password:'',
      email:'',
      phone:'',
      house:'',
      street:'',
      district:'',
      pincode:'',
      state:''
    })
    const onChangeHandler=(e)=>{
       
        setFormData(()=>({
          ...formData,
          [e.target.name]:e.target.value
        }))
    }
  return (
    <div className='container'>
    <h2 className="card-title mb-4">Signup</h2>
   
    <form >
      <div className="form-group">
        <label className='labels'>Username:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          
          onChange={onChangeHandler}
        />
      </div>
      <div className="form-group">
        <label className='labels'>Password:</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
        
          onChange={onChangeHandler}
          minLength={8}
          maxLength={20}
          required
        />
      </div>
      <div className="form-group">
        <small >Password must be 8-20 characters long with at least one digit and one special character.</small>
      </div>
      <div className="form-group">
        <label className='labels'>Email:</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
         
          onChange={onChangeHandler}
        />
      </div>
    
        <div className="form-group">
          <label className='labels'>House No.:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter house number"
          
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <label className='labels'>Street Name :</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter street name"
          
            onChange={onChangeHandler}
          />
        </div>
     
        <div className="form-group col-md-6">
          <label className='labels'>District:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter district"
        
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group col-md-6">
          <label className='labels'>Pincode:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter pincode"
           
            onChange={onChangeHandler}
          />
        </div>
     
      
      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#007bff', color: '#fff' }}>Signup</button>
      </div>
    </form>
    </div>
);
};


export default Formpg
