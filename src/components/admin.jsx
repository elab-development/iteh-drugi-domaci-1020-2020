import React from 'react';
import AdminBook from './adminBook';
import { Link } from 'react-router-dom';


const Admin = ({books, onAdd, onRemove, setID}) => {
    
    return(  
        <div className='all-books'>
            <Link to='bookAdd'><h2>Add Book</h2></Link>
            {books == null? "No books" :
            books.map((book) => (
                <AdminBook 
                    book={book}
                    key = {book.id}
                    onAdd = {onAdd}
                    onRemove = {onRemove}
                    setID={setID}
                />
            ))}

        </div>
    )
}

export default Admin;