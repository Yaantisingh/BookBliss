import React, { useState } from 'react';
import axios from 'axios';

const AddToCartForm = () => {
  const [cart, setCart] = useState({
    cart_id: '',
    username: '',
    book_title: '',
    book_id: '',
   
    quantity: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCart({ ...cart, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/cart/', cart);
      console.log(response.data.message); // Assuming success message is returned from the server
      // Clear form after successful submission
      setCart({
        cart_id: '',
        username: '',
        book_title: '',
        book_id: '',
        quantity: 0
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="cart_id"
        value={cart.cart_id}
        placeholder="Cart ID"
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        value={cart.username}
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        type="text"
        name="book_title"
        value={cart.book_title}
        placeholder="Book Title"
        onChange={handleChange}
      />
      <input
        type="text"
        name="book_id"
        value={cart.book_id}
        placeholder="Book ID"
        onChange={handleChange}
      />
      
      <input
        type="number"
        name="quantity"
        value={cart.quantity}
        placeholder="Quantity"
        onChange={handleChange}
      />
      <button type="submit">Add to Cart</button>
    </form>
  );
};

export default AddToCartForm;
