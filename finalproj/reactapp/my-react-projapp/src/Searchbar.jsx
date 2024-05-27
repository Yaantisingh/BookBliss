
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./searchbar.css"
import { IoMdSearch } from "react-icons/io";

const Searchbar = () => {

  const [bookId, setBookId] = useState('');

  const [bookData, setBookData] = useState(null);
  // const navigate = useNavigate();
 
  const handleInputChange = (event) => {
    setBookId(event.target.value);
  };

 
  const searchBook = async () => {
    try {

      const response = await axios.get(`http://127.0.0.1:8000/books/${bookId}`);

      setBookData(response.data.books);
      // navigate('/BookList', { state: { bookData: response.data.books } });
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  return (
    <div className='search-container'>
     
      <input className='search-input'
        type="text"
        placeholder="Enter Book ID"
        value={bookId}
        onChange={handleInputChange}
      />
      <button id="search-button" onClick={searchBook}><IoMdSearch size={30}/></button>
     
     
      {bookData && (
        <div id="search_res">
          {/* <h2>Book Details:</h2> */}
          <p>Book ID: {bookData.book_id}</p>
          <p>Title: {bookData.book_title}</p>
         
        </div>
      )}
    </div>
  );
};
export default Searchbar