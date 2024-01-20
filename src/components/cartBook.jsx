import React from 'react';
import { ImPlus, ImMinus } from "react-icons/im";

const CartBook = ({book, onAdd, onRemove}) => {       
    return(
        <div className='card'>
            <img className='card-img-top' src = {book.book_img} alt = "Cover image" width = "200px" height = "300px"/>
            <div className='card-body'>
                <h3 className='card-title'>{book.book_name}</h3>
                <br></br>
                <p className='card-text'>Amount: {book.amount}</p>   
                <div className='btn-div'>                    
                    <button className="btn" onClick={() => onAdd(book.id)}>
                        <ImPlus />
                    </button>
                    <button className="btn" onClick={() => onRemove(book.id)} >
                        <ImMinus />
                    </button>
                </div>          
            </div>
        </div>
    )
}

export default CartBook;