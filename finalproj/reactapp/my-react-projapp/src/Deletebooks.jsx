import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import "./Deletebooks.css";

const DeleteBook = () => {
  const [bookId, setBookId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
      } else {
        setMessage('');
        setError(data.message || 'Failed to delete book');
      }
    } catch (error) {
      alert('Error:', error);
      setError('Error occurred while deleting book');
    }
  };

  return (
    <>
      <Nav />
      <div id="delform">
        <h2 id="Delete_Book">Delete Book</h2>
        <input id="cont" placeholder='Book ID:'
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
        <button id="delb" onClick={handleDelete}>Delete Book</button>
        {message && <p id="dmsg">{message}</p>}
        {error && <p id="derror">{error}</p>}
      </div>
      <button className="admin_button" onClick={() => navigate('/Adminpg')}>Go To Admin Dashboard</button>
    </>
  );
};

export default DeleteBook;
