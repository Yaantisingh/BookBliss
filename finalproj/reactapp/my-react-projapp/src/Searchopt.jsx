import React from 'react'
// import { TbCategory } from "react-icons/tb";
// import { FaAddressBook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./Searchopt.css"
const Searchopt = () => {
  return (
    <div id="searchoptions">
         <h3 id="author"><Link to="/BookListByAuthor">Search by Author</Link></h3>
      <h3 id="category"><Link to="/Catrelg">Search by Category</Link></h3>
    </div>
  )
}

export default Searchopt
