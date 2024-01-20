import React from 'react';
import { ImPlus, ImMinus, ImInfo } from "react-icons/im";
import { Link, Routes } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';


const Book = ({book, onAdd, onRemove}) => {       
    const ol = book.ol;

    const [book_response, setResponse] = useState([]);
    useEffect(() => {url()}, []);
    const url = async () => {
        const r = await fetch("https://openlibrary.org/books/" + ol + ".json");
        setResponse(await r.json());
        console.log(book_response);
    }

    return(
        <div className='card'>
            <img className='card-img-top' src = {book.book_img} alt = "Cover image" width = "200px" height = "300px"/>
            <div className='card-body'>
                <h3 className='card-title'>{book_response.title}</h3>
                <br></br>
                <p className='card-text'>Author: {book.author}</p>
                <p className='card-text'>Publish Date: {book_response.publish_date}</p>
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

export default Book;