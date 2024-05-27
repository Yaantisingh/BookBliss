
import React from 'react';

const BookList = ({ books }) => {

  const booksArray = Array.isArray(books) ? books : [];

  return (
    <div>
      <h2>Book Details:</h2>
      {booksArray.map(book => (
        <div key={book.book_id}>
          <p>Book ID: {book.book_id}</p>
          <p>Title: {book.book_title}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;

