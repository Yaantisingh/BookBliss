import React, { useEffect, useState } from 'react';
import './Product.css';
import Nav from './Nav';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { RiDashboardFill } from "react-icons/ri";
const Displaybooks = ({ username }) => {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const navigate = useNavigate(); // Accessing useNavigate hook

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  


  return (
    <div>
      <Nav />
      <RiDashboardFill size={30} onClick={() => navigate('/Adminpg')}></RiDashboardFill>
     

      {books.map(book => (
        <div id="dis_style1" key={book.book_id}>
          {/* <h2>Book id: {book.book_id}</h2> */}
          <img src={book.image} alt="Book cover" id="prod_img"/>
          <div id='all_details'>
          <p className='prod_details'>Id: {book.book_id}</p>
          <p className='prod_details'>{book.book_title}</p>
          <p className='prod_details'>Category: {book.category}</p>
          <p className='prod_details'>Author: {book.author}</p>
          <p className='prod_details'>Price: Rs.{book.price}</p>
          
          {/* <button onClick={() => addToCart(book.book_id, book.book_title, book.price,book.image)} id="add_cartbtn">Add to cart</button> */}
          </div> </div>
      ))}
      
     
    </div>
  );
};

export default Displaybooks;



