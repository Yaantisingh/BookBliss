// // import React, { useState } from 'react';
// // import "./UpdateBook.css"
// // const UpdateBookForm = () => {
// //   const [bookId, setBookId] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [category, setCategory] = useState('');

// //   const categories = ['Spiritual','Fiction', 'Comedy', 'Thriller', 'Recipes', 'Motivational'];
// //   const [book, setBook] = useState({
// //     book_title: '',
// //     price: '',
// //     author: '',
// //     category: 'categories'
// //   });

// //   const handleBookIdChange = (e) => {
// //     setBookId(e.target.value);
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setBook((prevBook) => ({
// //       ...prevBook,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(book),
// //       });

// //       if (response.ok) {
// //         setMessage(response.message);
// //         // Handle success, you may want to display a success message or navigate to another page
// //         alert('Book updated successfully');
// //       } else {
// //         // Handle error, you may want to display an error message
// //         console.error('Error updating book');
// //       }
// //     } catch (error) {
// //       console.error('Error updating book', error);
// //     }
// //   };

// //   return (
// //     <div className='updateformparent'>
// //       <form onSubmit={handleSubmit} id="updateform">
// //         <label className='updfields' id="ubid">
// //           Book ID:
// //           <input className="updcontents" type="text" value={bookId} onChange={handleBookIdChange} />
// //         </label>
// //         <br />
// //         <label className='updfields'>
// //           Book Title:
// //           <input className="updcontents" type="text" name="book_title" value={book.book_title} onChange={handleInputChange} />
// //         </label>
// //         <br />
// //         <label className='updfields'>
// //         Book Price:
// //           <input className="updcontents" type="text" name="price" value={book.price} onChange={handleInputChange} />
// //         </label>
// //         <br />
// //         <label className='updfields'>
// //         Book Author:
// //           <input className="updcontents" type="text" name="author" value={book.author} onChange={handleInputChange} />
// //         </label>
// //         <br />
// //         <label  className='fields'>Category
// //       <select  className="contents" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
// //         <option value="Spiritual">Spiritual</option>
// //         <option value="Thriller">Thriller</option>
// //         <option value="Comedy">Comedy</option>
// //         <option value="Fiction">Fiction</option>
// //         <option value="Motivational">Motivational</option>
// //         <option value="Recipes">Recipes</option>
// //       </select>
// //       </label>
// //         <br />
// //         <button id="updbutton"type="submit">Update Book</button>
// //         <p id="updmsg">{message}</p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default UpdateBookForm;


// import React, { useState } from 'react';
// import "./UpdateBook.css"

// const UpdateBookForm = () => {
//   const [bookId, setBookId] = useState('');
//   const [message, setMessage] = useState('');
//   const [category, setCategory] = useState(''); // Updated category state

//   const categories = ['Spiritual', 'Fiction', 'Comedy', 'Thriller', 'Recipes', 'Motivational'];
//   const [book, setBook] = useState({
//     book_title: '',
//     price: '',
//     author: '',
//     category: '', // Updated category value
//   });

//   const handleBookIdChange = (e) => {
//     setBookId(e.target.value);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBook((prevBook) => ({
//       ...prevBook,
//       [name]: value,
//     }));
//   };

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//     // Update the 'category' field in the 'book' state
//     setBook((prevBook) => ({
//       ...prevBook,
//       category: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(book),
//       });

//       if (response.ok) {
//         setMessage(response.message);
//         // Handle success, you may want to display a success message or navigate to another page
//         alert('Book updated successfully');
//       } else {
//         // Handle error, you may want to display an error message
//         console.error('Error updating book');
//       }
//     } catch (error) {
//       console.error('Error updating book', error);
//     }
//   };

//   return (
//     <div className='updateformparent'>
//       <form onSubmit={handleSubmit} id="updateform">
//         <label className='updfields' id="ubid">
//           Book ID:
//           <input className="updcontents" type="text" value={bookId} onChange={handleBookIdChange} />
//         </label>
//         <br />
//         <label className='updfields'>
//           Book Title:
//           <input className="updcontents" type="text" name="book_title" value={book.book_title} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label className='updfields'>
//           Book Price:
//           <input className="updcontents" type="text" name="price" value={book.price} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label className='updfields'>
//           Book Author:
//           <input className="updcontents" type="text" name="author" value={book.author} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label className='fields'>Category
//           <select className="contents" name="category" value={book.category} onChange={handleCategoryChange}>Category
//             <option value="Spiritual">Spiritual</option>
//             <option value="Thriller">Thriller</option>
//             <option value="Comedy">Comedy</option>
//             <option value="Fiction">Fiction</option>
//             <option value="Motivational">Motivational</option>
//             <option value="Recipes">Recipes</option>
//           </select>
//         </label>
//         <br />
//         <button id="updbutton" type="submit">Update Book</button>
//         <p id="updmsg">{message}</p>
//       </form>
//     </div>
//   );
// };

// export default UpdateBookForm;


// import React, { useState } from 'react';
// import "./UpdateBook.css";

// const UpdateBookForm = () => {
//   const [bookId, setBookId] = useState('');
//   const [message, setMessage] = useState('');
//   const [category, setCategory] = useState('');

//   const categories = ['Spiritual', 'Fiction', 'Comedy', 'Thriller', 'Recipes', 'Motivational'];
//   const [book, setBook] = useState({
//     book_title: '',
//     price: '',
//     author: '',
//     category: '',
//   });

//   const handleBookIdChange = (e) => {
//     setBookId(e.target.value);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBook((prevBook) => ({
//       ...prevBook,
//       [name]: value,
//     }));
//   };

//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setCategory(selectedCategory);

//     // Update the 'category' field in the 'book' state
//     setBook((prevBook) => ({
//       ...prevBook,
//       category: selectedCategory,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(book),
//       });

//       if (response.ok) {
//         setMessage(response.message);
//         // Handle success, you may want to display a success message or navigate to another page
//         alert('Book updated successfully');
//       } else {
//         // Handle error, you may want to display an error message
//         console.error('Error updating book');
//       }
//     } catch (error) {
//       console.error('Error updating book', error);
//     }
//   };

//   return (
//     <div className='updateformparent'>
//       <form onSubmit={handleSubmit} id="updateform">
//         <label className='updfields' id="ubid">
//           Book ID:
//           <input className="updcontents" type="text" value={bookId} onChange={handleBookIdChange} />
//         </label>
//         <br />
//         <label className='updfields'>
//           Book Title:
//           <input className="updcontents" type="text" name="book_title" value={book.book_title} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label className='updfields'>
//           Book Price:
//           <input className="updcontents" type="text" name="price" value={book.price} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label className='updfields'>
//           Book Author:
//           <input className="updcontents" type="text" name="author" value={book.author} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label className='fields'>Category
//           <select className="contents" value={category} onChange={handleCategoryChange}>
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />
//         <button id="updbutton" type="submit">Update Book</button>
//         <p id="updmsg">{message}</p>
//       </form>
//     </div>
//   );
// };

// export default UpdateBookForm;



import React, { useState } from 'react';
// import "./UpdateBook.css";

const ForgetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

//   const [book, setBook] = useState({
//     book_title: '',
//     price: '',
//     author: '',
//     category: '',
//   });

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBook((prevBook) => ({
//       ...prevBook,
//       [name]: value,
//     }));
//   };

//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setCategory(selectedCategory);

    // Update the 'category' field in the 'book' state
//     setBook((prevBook) => ({
//       ...prevBook,
//       category: selectedCategory,
//     }));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        setMessage(response.message);
        // Handle success, you may want to display a success message or navigate to another page
        alert('password changed successfully');
      } else {
        // Handle error, you may want to display an error message
        console.error('Error changing password');
      }
    } catch (error) {
      console.error('Error changing password', error);
    }
  };

  return (
    <div className='updateformparent'>
      <form onSubmit={handleSubmit} id="updateform">
        <label className='updfields' id="ubid">
          Enter New Password:
          <input className="updcontents" type="text" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        {/* <label className='updfields'>
        Enter New Password again:
          <input className="updcontents" type="text" name="book_title" value={book.book_title} onChange={handleInputChange} />
        </label> */}
        
        <br />
        <button id="updbutton" type="submit">Update Book</button>
        <p id="updmsg">{message}</p>
      </form>
    </div>
  );
};

export default ForgetPassword;

