import React, { useState } from 'react';
import "./Addbooks.css"
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const Addbooks = () => {
  const [book_id, setBookId] = useState('');
  const [book_title, setBookTitle] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const categories = ['Spiritual','Fiction', 'Comedy', 'Thriller', 'Recipes', 'Motivational','Biography','Drama','Classic','Fantasy','Science Fiction','Horror','Mystery']; 

  const addBook = async (book) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/addbooks/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      const data = await res.json();

      if (res.status === 200) {
        alert(data.message); // Book added successfully
      } else if (res.status === 400) {
        alert(data.message); // Book ID already exists
      } else {
        alert('Error adding book'); // Other errors
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding book'); // Network or server errors
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addBook({ book_id, book_title, price, author, category, image, quantity });
  }

  return (
    <>
      <Nav/>
      <div className='formparent'>
        <form id='insertform'>
          <label className='fields' id="bid">Book id:
            <input className="contents" name="book_id" type="text" placeholder="BOOK ID" value={book_id} onChange={(e) => setBookId(e.target.value)} />
          </label>
          <br />
          <label className='fields'>Book title:
            <input className="contents" name="book_title" type="text" placeholder="BOOK TITLE" value={book_title} onChange={(e) => setBookTitle(e.target.value)} />
          </label>
          <br />
          <label className='fields'>Book price:
            <input className="contents" name="price" type="text" placeholder="PRICE (in rupees)" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <br />
          <label className='fields'>Book author:
            <input className="contents" name="author" type="text" placeholder="AUTHOR" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </label>
          <br />
          <label className='fields'>
            Category:
            <select className="contents" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <label className='fields'>Image:
            <input className="contents" name="image" type="text" placeholder="IMAGE" value={image} onChange={(e) => setImage(e.target.value)} />
          </label>
          <label className='fields'>Quantity:
            <input className="contents" name="quantity" type="text" placeholder="QUANTITY" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </label>
          <br />
          <button id="button" onClick={onSubmit}>Add Book</button>
        </form>
        <button className="admin_button" onClick={() => navigate('/Adminpg')}>Go To Admin Dashboard</button>
      </div>
    </>
  );
};

export default Addbooks;
