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
import Admin from './components/admin';
import BookAdd from './components/bookAdd';

const axios_instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 10000,
  headers: {'crossorigin':'anonymous'},
  withCredentials: false
});

function App() {

  const [token, setToken] = useState();
  const [isLoggedIn, setLoginState] = useState(false);
  const [ID, setID] = useState(0);

  const addToken = (auth_token) => {
    setToken(auth_token);
    setLoginState(true);
  }

  const logout = () => {
      window.sessionStorage.setItem("auth_token", null);
      window.sessionStorage.setItem("auth_name", "");
      window.sessionStorage.setItem("auth_id", null);
      window.sessionStorage.setItem("role_id",null);
      setToken(undefined);
      setLoginState(false);
      window.location.assign('/');
  }

  // Adding, editing and deleting books from database
  const edit = (title, author, genre_id, id) =>{
    axios_instance.patch('books/'+id+'?title='+title+'&author='+author+'&genre_id='+genre_id, {}, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem(
          "auth_token"
        )}`,
      }
    })
  }

  const destroy = (id) => {
    books.map((book) => {
      if (book.id === id) {
        axios_instance.delete('books/'+id, {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem(
              "auth_token"
            )}`,
          }
        }).then(response => {console.log(response)})
        refreshCat();
      }
    });

  }

  const add = (title, author, genre_id) =>{
      axios_instance.post('books?title='+title+'&author='+author+'&genre_id='+genre_id, {}, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem(
          "auth_token"
        )}`,
      }
    })
  }


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

  const refreshCat = () => {
    const newBooks = books.filter((book) => book != null);
    setBooks(newBooks);
  }

  // Objects (books, number of cart items, books in cart...)
  const [cartNum, setCartNum] = useState(0);
  const [books, setBooks] = useState([]);
  const [cartBooks, setCartBooks] = useState([]);

  //Get books from laravel
  useEffect(() => {
    const getBooks = async() => {
      const response = await axios_instance.get('books');
      setBooks(response.data.books);
      console.log(response.data);
    }
    getBooks();
  }, [axios_instance])

  
  return (
    <BrowserRouter>
      <NavBar cartNum = {cartNum} isLoggedIn={isLoggedIn} logout = {logout}/>
      <Routes>
        <Route path = "/"
          element = {
          <Books books = {books} onAdd = {addToCart} onRemove = {removeFromCart} isLoggedIn={isLoggedIn}/>
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
          }/>
        <Route path ="/login"
          element = {
            <Login login axios_instance = {axios_instance} addToken={addToken}/>
          }/>
        <Route path = "/admin"
          element = {
          <Admin books = {books} setID={setID} onAdd = {edit} onRemove = {destroy} isLoggedIn={isLoggedIn}/>
          }
          />
        <Route path = "admin/bookAdd"
          element = {
          <BookAdd handleSubmit={add} id={-1}/>
          }
          />
        <Route path = "admin/bookEdit"
          element = {
          <BookAdd handleSubmit={edit} id={ID}/>
          }
          />
      </Routes>      
    </BrowserRouter>
  );
}

export default App;
