import React, { useState, useEffect } from 'react';
import './CartItems.css';
import Footer from './footer';
import { IoTrash } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

const UserDetails = ({ userData, handleQuantityUpdate, handleRemoveItem }) => (
  <div>
    <h2>Your Cart details are:</h2>
    <ul className='cart_items'>
      {userData.map(item => (
        <li key={item.cart_id} className="cart_item">
          <img src={item.image} alt="Book Cover" />
          <div className="book_title">{item.book_title}</div>
          <div>Rs {item.price}</div>
          <div className="quantity">
            <button className="updbtn"onClick={() => handleQuantityUpdate(item.cart_id, item.quantity - 1)}>-</button>
            {item.quantity}
            <button className="updbtn"onClick={() => handleQuantityUpdate(item.cart_id, item.quantity + 1)}>+</button>
          </div>
          <div className="total_price">Rs {item.price * item.quantity}</div>
          <div className="remove_action">
            <button onClick={() => handleRemoveItem(item.cart_id, item.book_id)}>
              <i className="fa fa-trash"></i><IoTrash /> Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const CartItems = ({ handleTotalPrice }) => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Redirect to login if no user is logged in
      navigate('/Loginpg');
    }
  }, [navigate]);


  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/cart/username/${username}`);
      const data = await response.json();
      setUserData(data.username);
      setError(null);
      // Calculate total price and pass it to the parent component
      const totalPrice = data.username.reduce((total, item) => total + (item.price * item.quantity), 0);
      handleTotalPrice(totalPrice);
    } catch (err) {
      setUserData(null);
      setError('User not found');
    }
  };

  const handleQuantityUpdate = async (cartId, newQuantity) => {
    // Ensure quantity is not less than 1
    const quantity = newQuantity >= 1 ? newQuantity : 1;

    // Update quantity in the frontend
    const updatedUserData = userData.map(item => {
      if (item.cart_id === cartId) {
        return { ...item, quantity };
      }
      return item;
    });
    setUserData(updatedUserData);

    try {
      // Update quantity in the backend
      const response = await fetch(`http://127.0.0.1:8000/cart/${cartId}/update_quantity/${quantity}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to update quantity in the database');
      }
      // Quantity updated successfully in the backend
      // Fetch updated cart data
      fetchUserData();
    } catch (err) {
      console.error('Error updating quantity in the database:', err);
    }
  };

  const handleRemoveItem = async (cartId, bookId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/delcart/${username}/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete item from the cart');
      }
      // Item deleted successfully from the backend
      // Fetch updated cart data
      fetchUserData();
    } catch (err) {
      console.error('Error deleting item from the cart:', err);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username]);

  return (
    <div>
      <Nav/>
      <h2>Welcome, {username}!</h2> 
      {error && <p>{error}</p>}

      {userData && <UserDetails userData={userData} handleQuantityUpdate={handleQuantityUpdate} handleRemoveItem={handleRemoveItem} />}
      <p className="total_price">Total Amount: Rs {userData ? userData.reduce((total, item) => total + (item.price * item.quantity), 0) : 0}</p>
      
      <Link to="/Payment">
        <button className='crt_btnn'>Proceed to Pay</button>
      </Link>
      <Footer/>
    </div>
  );
};

export default CartItems;
