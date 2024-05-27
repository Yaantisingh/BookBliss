import React, { useState, useEffect } from 'react';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch book details from the backend (FastAPI) when the component mounts
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/books');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      {products.map((product) => (
        <div key={product.bookId}>
          <img src={product.img} alt={product.bookname} />
          <p>{product.bookname}</p>
          <p>Author: {product.author}</p>
          <p>ISBN: {product.isbn}</p>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => addToCart(product.bookId)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;