

import React, { useEffect, useState } from 'react';
import './Product.css';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const Product = ({ username }) => {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const navigate = useNavigate(); // Accessing useNavigate hook

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books')
      .then(response => response.json())
      .then(data => {
        const sortedBooks = sortBooks(data, sortBy);
        setBooks(sortedBooks);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [sortBy]);

  const sortBooks = (books, sortBy) => {
    switch (sortBy) {
      case 'priceLowToHigh':
        return [...books].sort((a, b) => a.price - b.price);
      case 'priceHighToLow':
        return [...books].sort((a, b) => b.price - a.price);
      default:
        return [...books];
    }
  };

  const addToCart = async (bookId, bookTitle, bookPrice,image) => {
    if (!username) {
      navigate("/Loginpg"); // Redirect to login page if not logged in
      return;
    }

    const quantityInput = prompt(`Enter the quantity for ${bookTitle}:`, '1');
    const quantity = parseInt(quantityInput, 10);

    if (isNaN(quantity) || quantity <= 0) {
      alert('Invalid quantity. Please enter a valid number greater than 0.');
      return;
    }

    const cart_id = `${bookId}_${username}`;

    const cartDetails = {
      cart_id: cart_id,
      username: username,
      book_title: bookTitle,
      book_id: bookId,
      quantity: quantity,
      image:image,
      price: bookPrice
    };
   
    try {
      const response = await fetch('http://127.0.0.1:8000/cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartDetails),
      });

      if (response.ok) {
        alert(`Added ${quantity} ${bookTitle}(s) to the cart`);
      } else {
        const errorData = await response.json();
        alert(`book already added to cart: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div>
      <Nav />
      <label id="sortDropdown" htmlFor="sortDropdown">
        Sort by Price:
        <select id="sortprice" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="priceLowToHigh">Price Low to High</option>
          <option value="priceHighToLow">Price High to Low</option>
        </select>
      </label>

      {books.map(book => (
        <div id="dis_style1" key={book.book_id}>
          {/* <h2>Book id: {book.book_id}</h2> */}
          <img src={book.image} alt="Book cover" id="prod_img"/>
          <div id='all_details'>
          <h2 className='prod_details'>{book.book_title}</h2>
          <h3 className='prod_details'>Category: {book.category}</h3>
          <h3 className='prod_details'>Author: {book.author}</h3>
          <h3 className='prod_details'>Price: Rs.{book.price}</h3>
          
          
          <button onClick={() => addToCart(book.book_id, book.book_title, book.price,book.image)} id="add_cartbtn">Add to cart</button>
          </div> </div>
      ))}
    </div>
  );
};

export default Product;



