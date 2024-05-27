import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./searchbar.css"
import { IoMdSearch } from "react-icons/io";
const BookSearch = () => {
  const [bookTitle, setBookTitle] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to the search result page with the book title as a query parameter
    navigate(`/SearchResult?title=${encodeURIComponent(bookTitle)}`);
  };

  return (
    <div className='search-container'>
      <input
       className='search-input'
       type="text"
       placeholder="Enter Book Name"
        id="bookTitle"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
      />
      <button id="search-button" onClick={handleSearch}><IoMdSearch size={30}/></button>
    </div>
  );
};

export default BookSearch;