import React from 'react'
import Nav from "./Nav"

import "./Adminpg.css"
import { Link } from 'react-router-dom';

const Adminpg = () => {
  return (
    <>
    <div id="admin">
      <div id="insert"><h2 className='design'><Link to="/Addbooks">Insert new book record</Link></h2></div>
      <div id="update"><h2 className='design'><Link to="/UpdateBookForm">Update book record</Link></h2></div>
      <div id="display"><h2 className='design'><Link to="/Displaybooks">Display book record</Link></h2></div>
      <div id="delete"><h2 className='design'><Link to="/Deletebooks">Delete book record</Link></h2></div>
      <button id='logout'  type='submit'>
      <Link to={{ pathname: '/Logout'}}>Logout</Link>
          </button>
    </div> 
    </>
  )
}

export default Adminpg