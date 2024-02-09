import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navBar';
import Books from './components/books';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from './components/cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Contact from './components/contact';
import Register from './components/register';
import Login from './components/login';

const axios_instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 10000,
  headers: {'crossorigin':'anonymous'},
  withCredentials: false
});

function App() {

  var viewed_book = null;
  
  const [token, setToken] = useState();
  const [isLoggedIn, setLoginState] = useState(false);
  const [ID, setID] = useState(0);

  // Remove an item from cart
  const removeFromCart = (id) => {
    books.map((book) => {
      if (book.id === id) {
        if (book.amount > 0) {   
          book.amount = book.amount - 1;
          const a = cartNum - 1;
          setCartNum(a);
          refreshCart();
          console.log("Book ID =", book.id, "Amount =", book.amount);
        } else {
          alert("There are no copies of this book in the cart!");
        }
      }
    });
  };

  const purchase = () => {
    books.map((book) => {
        book.amount = 0;
    })
    const a = 0;
    setCartNum(a);
    refreshCart();
    alert("Your purchase has been completed!");
  };

  // Add an item to cart
  const addToCart = (id) => {
    books.map((book) => {
      if (book.id === id) {
        book.amount = book.amount + 1;
        const a = cartNum + 1;
        setCartNum(a);
        refreshCart();
        console.log("Book ID =", book.id, "Amount =", book.amount);
      }
    });
  };

  // Refresh cart function
  const refreshCart = () => {
    const newBooks = books.filter((book) => book.amount > 0);
    setCartBooks(newBooks);
  }

  // Objects (books, number of cart items, books in cart...)
  const [cartNum, setCartNum] = useState(0);
  const [books, setBooks] = useState(null);
  const [cartBooks, setCartBooks] = useState([]);

  //Read data from json file
  useEffect(()=>{
    const fetchData = async () => {
      const response = await axios.get('/bookData.json');
      console.log(response.data.books);
      setBooks(response.data.books);
    }

    fetchData();
  }, []);


  return (
    <BrowserRouter>
      <NavBar cartNum = {cartNum}/>
      <Routes>
        <Route path = "/"
          element = {
          <Books books = {books} onAdd = {addToCart} onRemove = {removeFromCart}/>
          }
          />
        <Route path = "/cart"
          element = {
            <Cart cartBooks = {cartBooks} onAdd = {addToCart} onRemove = {removeFromCart} onPurchase = {purchase}/>
          } />
        <Route path ="/contact"
          element = {
            <Contact contact />
          }
        />
        <Route path ="/register"
          element = {
            <Register register />
          }
        />
        <Route path ="/login"
          element = {
            <Login login />
          }
        />
      </Routes>      
    </BrowserRouter>
  );
}

export default App;
