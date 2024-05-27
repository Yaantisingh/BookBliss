

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./searchbar.css";

const SearchResult = ({ username }) => {
  const location = useLocation();
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');

    if (title) {
      fetch(`http://127.0.0.1:8000/books/title/${title}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('No books found by this name');
          }
        })
        .then((data) => {
          setBooks(data.books);
          setError(null); 
        })
        .catch((err) => setError(err.message));
    }
  }, [location.search]);

  return (
    <div>
      {error && <p>{error}</p>}
      {books.map((book) => (
        <div id="search_res" key={book.book_id}>
          <div className="book-container">
            {/* Display the book image if available */}
            {book.image && <img className="book-image" src={book.image} alt="Book Cover" />}
            <div className="book-details">
              <p>{book.book_title}</p>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>
              <p>Price: Rs{book.price}</p>
              <button onClick={() => handleAddToCart(book.book_id, book.book_title, book.image,book.price)}>Add to cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
