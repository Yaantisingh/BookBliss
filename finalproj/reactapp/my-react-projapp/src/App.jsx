
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import "./App.css"
import Aboutpg from './Aboutpg';
import Adminpg from './Adminpg';
import ContactUs from './ContactUs';
import Signup from './Signup';
import Addbooks from './Addbooks';
import UpdateBookForm from './UpdateBookForm';
import Displaybooks from './Displaybooks';
import Deletebooks from './Deletebooks';
import Catrelg from './Catrelg';
import BookList from './BookList';
import BookListByAuthor from './BookListByAuthor';
import BookSearch from './BookSearch';
import SearchResult from './SearchResult';
import ImageSlider from './ImageSlider';
import Loginpg from './Loginpg';
import Product from './Product';
import AddToCartPage from './AddToCartPage';
import AdminLogin from './AdminLogin';
import CartItems from './CartItems';
import Addtocart from './Addtocart';
import Payment from './Payment';
import Logout from './Logout';

function App() {
  const [username, setUsername] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); // State to manage total price

  const handleLogin = (username) => {
    setUsername(username);
  };

  const handleTotalPrice = (price) => {
    setTotalPrice(price);
  };

  return (
    <div id='page'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Aboutpg" element={<Aboutpg />} />
          <Route exact path="/Adminpg" element={<Adminpg />} />
          <Route exact path="/ContactUs" element={<ContactUs />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Addbooks" element={<Addbooks />} />
          <Route exact path="/UpdateBookForm" element={<UpdateBookForm />} />
          <Route exact path="/Displaybooks" element={<Displaybooks />} />
          <Route exact path="/Deletebooks" element={<Deletebooks />} />
          <Route exact path="/Catrelg" element={<Catrelg username={username}/>} />
          <Route path="/BookList" element={<BookList />} />
          <Route path="/BookListByAuthor" element={<BookListByAuthor username={username}/>} />
          <Route exact path="/BookSearch" element={<BookSearch />} />
          <Route exact path="/SearchResult" element={<SearchResult username={username}/>} />
          <Route exact path="/ImageSlider" element={<ImageSlider />} />
          <Route exact path="/Loginpg" element={<Loginpg onLogin={handleLogin} />} />
          <Route exact path="/AddToCartPage" element={<AddToCartPage />} />
          <Route exact path="/AdminLogin" element={<AdminLogin onLogin={handleLogin}/>} />
          <Route exact path="/Addtocart" element={<Addtocart />} />
          <Route path="/Logout" element={<Logout setUsername={setUsername} />} />
          <Route
            exact
            path="/Payment"
            element={<Payment totalPrice={totalPrice} />} // Pass total price to Payment component
          />
          <Route
            exact
            path="/Product"
            element={<Product username={username} />} // If needed, pass username to Product component
          />
          <Route
            exact
            path="/CartItems"
            element={
              username ? 
                <CartItems handleTotalPrice={handleTotalPrice} /> : // Pass handleTotalPrice to CartItems component
                <Loginpg onLogin={handleLogin} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
