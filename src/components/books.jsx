import React from 'react';
import Book from './book';
import { useEffect,useState } from 'react';


const Books = ({books, onAdd, onRemove, isLoggedIn}) => {

    var randomNum = 10;
      
    return(
        <div className='all-books'>
            {books == null? "No books" :
            books.map((book) => (
                <Book 
                    book={book}
                    key = {book.id}
                    amount = {0}
                    onAdd = {onAdd}
                    onRemove = {onRemove}
                    isLoggedIn={isLoggedIn}
                    randomNum={randomNum++}
                />
            ))}

        </div>
    )
}

export default Books;