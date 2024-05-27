import React, { useState, useEffect } from 'react';

const AddToCartPage = () => {
  const [customerId, setCustomerId] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItem] = useState(null);

  const handleLogin = async () => {
    // Simulating login, you should replace this with your actual authentication logic
    const customerId = 1; // Replace with the actual customer ID after authentication
    setCustomerId(customerId);

    // Call the API to add the customer ID to the cart
    const response = await fetch('/add-to-cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart_id: null,  // Assuming you want to create a new cart for each login
        book_id: null,  // Book ID will be set when selecting a book
        customer_id: customerId,
        quantity: 0,  // The quantity will be updated when selecting a book
      }),
    });

    const data = await response.json();
    setCartItem(data);
  };

  const handleAddToCart = async () => {
    // Call the API to add the selected book to the cart
    const response = await fetch('/add-to-cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart_id: cartItem.id,
        book_id: bookId,  // Set the actual book ID when selecting a book
        customer_id: customerId,
        quantity: quantity,
      }),
    });

    const data = await response.json();
    setCartItem(data);
  };

  useEffect(() => {
    if (customerId) {
      handleLogin();
    }
  }, [customerId]);

  return (
    <div>
      <h2>Add to Cart Page</h2>
      <button onClick={handleLogin}>Login</button>

      {customerId && (
        <>
          <label>Select Book ID:</label>
          <input
            type="number"
            value={bookId}
            onChange={(e) => setBookId(parseInt(e.target.value))}
          />

          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />

          <button onClick={handleAddToCart}>Add to Cart</button>

          {cartItem && (
            <div>
              <h3>Added to Cart</h3>
              <p>Cart ID: {cartItem.cart_id}</p>
              <p>Book ID: {cartItem.book_id}</p>
              <p>Customer ID: {cartItem.customer_id}</p>
              <p>Quantity: {cartItem.quantity}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddToCartPage;
