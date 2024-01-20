import React from 'react';
import Book from './book';


const Books = ({books, onAdd, onRemove}) => {
    
    return(
        <div className='all-books'>
            {books == null? "No books" :
            books.map((book) => (
                <Book 
                    book={book}
                    key = {book.id}
                    onAdd = {onAdd}
                    onRemove = {onRemove}
                />
            ))}

        </div>
    )
}

export default Books;