

import React, { useState } from 'react';
import "./searchcat.css"
import Nav from "./Nav"

import { IoMdSearch } from "react-icons/io";

const BookListByAuthor = ({ username }) => {
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const handleAddToCart = async (bookId, bookTitle, image, price) => {
    const cartId = `${bookId}-${username}`; // Combine book ID and username for cart ID

    try {
      const response = await fetch('http://127.0.0.1:8000/cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_id: cartId,
          username: username,
          book_title: bookTitle,
          book_id: bookId,
          quantity: '1', // Default quantity
          image: image,
          price: price
        }),
      });

      if (response.ok) {
        alert('Book added to cart successfully!');
        setError('');
      } else {
        const errorData = await response.json();
        if (response.status === 400 && errorData.detail === "Book already added to cart") {
          alert('Book already added to cart');
        } else if (response.status === 404) {
          alert('User not found');
        } else if (response.status === 500) {
          alert('Internal Server Error');
        } else {
          setError(errorData.message);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const fetchBooksByAuthor = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/author/${author}`);
      if (!response.ok) {
        throw new Error('No books found for the specified author');
      }
      const data = await response.json();
      setBooks(data.books);
      setError(null);
    } catch (err) {
      setBooks([]);
      setError(err.message);
    }
  };

  return (
    <div>
      <Nav />
      <div className='catsearchcont'>
        <input className="catsearch-input" placeholder='Book author'
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button id="catsearch-button" onClick={fetchBooksByAuthor}><IoMdSearch size={30} /></button>
      </div>
      {error && <p id="book_err">{error}</p>}
      <ul>
        {books.map(book => (
          <div className="aut1" key={book.book_id}>
            <div>
              {book.image && <img className="bookaut_image" src={book.image} alt="Book Cover" />}
            </div>
            <div className='aut_det'>
              <h2>{book.book_title}</h2>
              <h3>Author: {book.author}</h3>
              <h3>Price: Rs.{book.price}</h3>
              <h3>Category: {book.category}</h3>
              <button onClick={() => handleAddToCart(book.book_id, book.book_title, book.image, book.price)} className='autbtn'>Add to cart</button>
            </div>
          </div>
        ))}
      </ul>
      <br />
  
    </div>
  );
};

export default BookListByAuthor;
