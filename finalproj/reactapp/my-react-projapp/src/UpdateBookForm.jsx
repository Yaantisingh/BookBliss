import React, { useState } from 'react';
import "./UpdateBook.css";
import { useNavigate } from 'react-router-dom';

import Nav from './Nav';

const SearchBookForm = ({ onSearch, setError }) => {
  const [bookId, setBookId] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`);
      if (response.ok) {
        const data = await response.json();
        const fetchedBook = data.books;
        onSearch(fetchedBook);
        setError('');
      } else {
        setError('Error fetching book: Book ID not found');
        alert('Error fetching book: Book ID not found');
      }
    } catch (error) {
      setError('Error fetching book: ' + error.message);
      alert('Error fetching book: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSearch} id="searchform">
      <label>
        Book ID:
        <input className="updsearchinp" type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

const UpdateBookForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [book, setBook] = useState({
    book_id: '',
    book_title: '',
    price: '',
    author: '',
    category: '',
  });
  const categories = ['Spiritual', 'Fiction', 'Comedy', 'Thriller', 'Recipes', 'Motivational', 'Biography', 'Drama', 'Classic', 'Fantasy', 'Science Fiction', 'Horror', 'Mystery'];

  const searchBook = (fetchedBook) => {
    setBook(fetchedBook);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!book.book_id) {
        setError('Book ID is required');
        alert('Book ID is required');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/books/${book.book_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          book_title: book.book_title,
          price: book.price,
          author: book.author,
          category: book.category
        }),
      });

      if (response.ok) {
        setMessage('Book updated successfully');
        alert('Book updated successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }
    } catch (error) {
      setError('Error updating book: ' + error.message);
      alert('Error updating book: ' + error.message);
    }
  };

  return (
    <>
      <Nav />
      <div className='updateformparent'>
        <SearchBookForm onSearch={searchBook} setError={setError} />
        {book.book_id && (
          <form onSubmit={handleSubmit} id="updateform">
            <label className='updfields'>
              Book Id:
              <input className="updcontents" type="text" name="book_id" value={book.book_id} readOnly />
            </label>
            <label className='updfields'>
              Book Title:
              <input className="updcontents" type="text" name="book_title" value={book.book_title} onChange={handleInputChange} />
            </label>
            <br />
            <label className='updfields'>
              Book Price:
              <input className="updcontents" type="text" name="price" value={book.price} onChange={handleInputChange} />
            </label>
            <br />
            <label className='updfields'>
              Book Author:
              <input className="updcontents" type="text" name="author" value={book.author} onChange={handleInputChange} />
            </label>
            <br />
            <label className='fields'>
              Category
              <select className="contents" name="category" value={book.category} onChange={handleInputChange}>
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </label>
            <br />
            <button id="updbutton" type="submit">Update Book</button>
            <p id="updmsg">{message}</p>
            <p className="error">{error}</p>
          </form>
        )}
        <button className="admin_button" onClick={() => navigate('/Adminpg')}>Go To Admin Dashboard</button>
      </div>
    </>
  );
};

export default UpdateBookForm;
