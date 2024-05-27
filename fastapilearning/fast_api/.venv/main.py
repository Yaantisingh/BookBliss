from fastapi import FastAPI,Depends
from sqlalchemy import create_engine, Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base
from database import Base, SessionLocal,engine
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from fastapi import FastAPI
import mysql.connector
import json
import stripe
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Form
import logging

app=FastAPI()
logging.basicConfig(filename='api.log', encoding='utf-8', level=logging.DEBUG)
logger = logging.getLogger(__name__)

origins = ["http://localhost:3000"]  # Add your React app's origin here

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="54321",
  database="book_db"
)

class Book(BaseModel):
    book_id: str = None
    book_title: str = None
    price: float = None
    author: str = None
    category: str = None
    image: str = None
    quantity: str=None

class User(BaseModel):
    username: str = None
    password: str = None
    email: str = None
    phone: str = None
    house_num: str = None
    street_name: str = None
    district: str = None
    pincode: int = None
    state: str = None


class Cart(BaseModel):
    cart_id: str = None
    username: str = None
    book_title: str = None
    book_id: str = None
    quantity: int = None
    price: float=None
    image: str=None
   

class Contact(BaseModel):
    username: str = None
    email: str = None
    message: str = None

class PaymentRequest(BaseModel):
    amount: int
    name: str
    address: str
    country: str

# Get all books
@app.get("/books", response_model=List[Book])
def get_books():
    try:
        cursor = mydb.cursor(dictionary=True)
        cursor.execute("SELECT * FROM book")
        results = cursor.fetchall()
        
        books = []
        for row in results:
            book = Book(
                book_id=row['book_id'],
                book_title=row['book_title'],
                price=row['price'],
                author=row['author'],
                category=row['category'],
                image=row['image']  # Fetching image_path from database
            )
            books.append(book)
        
        return books
    except mysql.connector.Error as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Get a book by ID
@app.get("/books/{id}")
def get_book(id: str):
   

   cursor = mydb.cursor(dictionary=True)
   cursor.execute("SELECT * FROM book WHERE book_id = %s", (id,))
   result = cursor.fetchone()

   if not result:
        raise HTTPException(status_code=404, detail="Book ID not found")

   return {"books": result}
    

# Get a book by category
@app.get("/books/category/{category}")
def get_books_by_category(category: str):
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(f"SELECT * FROM book WHERE category = '{category}'")
    results = cursor.fetchall()
    if not results:
        raise HTTPException(status_code=404, detail="No books found in this category")
    
    return {"books": results}

@app.get("/books/author/{author}")
def get_books_by_author(author: str):
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(f"SELECT * FROM book WHERE author = '{author}'")
    results = cursor.fetchall()

    if not results:
        raise HTTPException(status_code=404, detail="No books found by this author")
    
    return {"books": results}

@app.get("/books/title/{book_title}")
def get_books_by_title(book_title: str):
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(f"SELECT * FROM book WHERE book_title = '{book_title}'")
    results = cursor.fetchall()

    if not results:
        raise HTTPException(status_code=404, detail="No books found by this name")
    
    return {"books": results}


@app.post("/addbooks/")
async def add_book(book: Book):
    cursor = mydb.cursor(dictionary=True)
    # Check if the book ID already exists
    cursor.execute("SELECT * FROM book WHERE book_id = %s", (book.book_id,))
    existing_book = cursor.fetchone()
    if existing_book:
        # Book ID already exists, return a message
        return {"message": "Book ID already exists"}
    
    # Insert the book into the database
    sql = "INSERT INTO book (book_id, book_title, price, author, category, image, quantity) VALUES (%s, %s, %s, %s, %s, %s,%s)"
    val = (book.book_id, book.book_title, book.price, book.author, book.category, book.image, book.quantity)
    cursor.execute(sql, val)
    mydb.commit()
    return {"message": "Book added successfully"}

# Delete a book by ID
@app.delete("/books/{id}")
def delete_book(id: str):
   


    cursor = mydb.cursor()
    try:
        cursor.execute("SELECT * FROM book WHERE book_id = %s", (id,))
        existing_book = cursor.fetchone()
        if not existing_book:
            raise HTTPException(status_code=404, detail="Book does not exist")

        cursor.execute("DELETE FROM book WHERE book_id = %s", (id,))
        mydb.commit()
        return {"message": "Book deleted successfully"}
    except mysql.connector.Error as err:
        return {"error": str(err)}
    finally:
        cursor.close()

from fastapi import HTTPException

@app.put("/books/{book_id}", response_model=Book)
def update_item(book_id: str, book: Book):
    # Connect to database (replace this with your database connection code)
   

    # Check if the book ID exists in the database
    cursor = mydb.cursor()
    cursor.execute("SELECT * FROM book WHERE book_id = %s", (book_id,))
    existing_book = cursor.fetchone()
    if not existing_book:
        raise HTTPException(status_code=404, detail="Book ID not found")

    # Update the book information
    query = "UPDATE book SET book_title=%s, price=%s, author=%s, category=%s WHERE book_id=%s"
    cursor.execute(query, (book.book_title, book.price, book.author, book.category, book_id))
    mydb.commit()
    cursor.close()

    book.book_id = book_id
    return book


@app.post("/user/")
async def signup_user(user: User):
    try:
        logger.info("Logging from the signup function")
        cursor = mydb.cursor(dictionary=True)
        sql = "INSERT INTO user (username, password, email, phone, house_num, street_name, district, pincode, state) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (user.username, user.password, user.email, user.phone, user.house_num, user.street_name, user.district, user.pincode, user.state)

        cursor.execute(sql, val)
        mydb.commit()
        return {"message": "Registration successful"}
    except mysql.connector.Error as e:
        if isinstance(e, mysql.connector.errors.IntegrityError) and e.errno == 1062:
            raise HTTPException(status_code=400, detail=f"Username '{user.username}' already exists. Please log in instead.")
        else:
            raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@app.post("/login/")
def login_user(user: User):
    logger.info("Logging from the login_user function")
    username = user.username
    password = user.password
    user_info = check_credentials(username, password)
    
    if user_info:
        return JSONResponse(
            status_code=200,
            content={"message": "Wow! You have been logged in successfully"}
        )
    else:
        raise HTTPException(
            status_code=401,
            detail="Username or Password does not match. Retry or Signup."
        )

def check_credentials(username, password):
    logger.info("Entering check_credentials function")
    logger.info(username)
    logger.info(password)
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(f"SELECT * FROM user WHERE USERNAME = '{username}' AND PASSWORD = '{password}'")
    results = cursor.fetchall()
    logger.info(results)
    return results  # Return the user information if found, else None


@app.post("/adminlogin/")
def loginUser(user: User):
    logger.info("logging from the loginUser function");
    username=user.username
    password=user.password
    user= login_user(username,password)
    if user:
        return JSONResponse(
                status_code=200,
            content={"message": "WoW! You have been logged in successfully"}
                )
    else:
        return JSONResponse(
            status_code=418,
            content={"message": "Username or Password does not match. Retry or Signup."}
            )
   

def login_user(username,password):
    logger.info("Entering login_user function");
    logger.info(username)
    logger.info(password)
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(f"SELECT * FROM admin WHERE USERNAME = '{username}'AND PASSWORD='{password}'")
    results = cursor.fetchall()
    logger.info(results)
    if not results:
       return False
    else:
       return {"user": results}

from fastapi import HTTPException

from fastapi import HTTPException
import mysql.connector



@app.post("/cart/")  
async def add_book_to_cart(cart: Cart):
    try:
        # Check if the user exists before adding to the cart
        cursor = mydb.cursor(dictionary=True)
        cursor.execute("SELECT * FROM user WHERE username = %s", (cart.username,))
        user = cursor.fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Check if the cart entry already exists
        cursor.execute("SELECT * FROM cart WHERE cart_id = %s", (cart.cart_id,))
        existing_cart = cursor.fetchone()
        if existing_cart:
            raise HTTPException(status_code=400, detail="Book already added to cart")

        # Insert into the cart table
        cursor.execute("INSERT INTO cart (cart_id, username, book_title, book_id, quantity, price, image) VALUES (%s, %s, %s, %s, %s, %s, %s)", 
                       (cart.cart_id, cart.username, cart.book_title, cart.book_id, cart.quantity, cart.price, cart.image))
        mydb.commit()
        return {"message": "Book added to cart successfully"}
    except mysql.connector.Error as err:
        logger.error("Error adding book to cart: %s", err)
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.post("/contact/")
async def add_query(contact: Contact):
    
    cursor = mydb.cursor(dictionary=True)
    sql = "INSERT INTO contact (username, email, message) VALUES (%s, %s, %s)"
    val = (contact.username,contact.email,contact.message)
    cursor.execute(sql, val)
    mydb.commit()
    return {"message": "message sent successfully"}


@app.get("/cart/username/{username}")
def get_username(username: str):
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(f"SELECT * FROM cart WHERE username = '{username}'")
    results = cursor.fetchall()

    if not results:
        raise HTTPException(status_code=404, detail="No username found by this name")
    
    return {"username": results}

@app.put("/cart/{cart_id}/update_quantity/{new_quantity}")
def update_quantity(cart_id: int, new_quantity: int):
    cursor = mydb.cursor()
    cursor.execute(f"UPDATE cart SET quantity = {new_quantity} WHERE cart_id = {cart_id}")
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return {"message": "Quantity updated successfully"}



stripe.api_key = "sk_test_51OzmIdSJDrpIZEnJYzwxNdPKTnevjyxTz9mYxEpzrEkaR4vdpQR4nGedgDxDAdZMzKSV6TrKjLXGYfKuNH99eJ7q00OGB89ZQD"


# Define endpoint for creating a payment intent
@app.post("/create-payment-intent")
async def create_payment_intent(payment_request: PaymentRequest):
    try:
        intent = stripe.PaymentIntent.create(
            amount=payment_request.amount,
            currency="usd",
            description="Description of the export transaction",
            metadata={
                'name': payment_request.name,
                'address': payment_request.address,
                'country': payment_request.country
            }
        )
        return {"client_secret": intent.client_secret}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@app.delete("/delcart/{username}/{book_id}")
def delete_book(username: str, book_id: str):
    cursor = mydb.cursor()
    cursor.execute("DELETE FROM cart WHERE username = %s AND book_id = %s", (username, book_id))
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Book not found in the cart")
    mydb.commit()
    return {"message": "Book deleted successfully from the cart"}

