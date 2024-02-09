import React from 'react';
import { ImPlus, ImMinus, ImInfo } from "react-icons/im";
import { Link, Routes } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';


const Book = ({book, onAdd, onRemove, isLoggedIn, randomNum}) => {   

    const [images, setImages] = useState(null);

    useEffect(() => {
        fetch('https://picsum.photos/v2/list')
            .then(response => response.json())
            .then(data => setImages(data))
            .catch(error => console.error("Error fetching data: ", error))
    }, [])
    
    if(images != null){
        if (isLoggedIn === false){
            return(
                <div className='card'>
                    <img className='card-img-top' src={images[randomNum].download_url} alt = "Cover image" width = "200px" height = "300px"/>
                    <div className='card-body'>
                        <h3 className='card-title'>{book.title}</h3>
                        <br></br>
                        <p className='card-text'>Author: {book.author}</p>
                        <p className='card-text'>Genre: {book.genre.name}</p>
                        <p className='card-text'>Publish Date: {book.publish_date}</p>           
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className='card'>
                    <img className='card-img-top' src = "https://picsum.photos/200/300" alt = "Cover image" width = "200px" height = "300px"/>
                    <div className='card-body'>
                        <h3 className='card-title'>{book.title}</h3>
                        <br></br>
                        <p className='card-text'>Author: {book.author}</p>
                        <p className='card-text'>Publish Date: {book.publish_date}</p>
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
    }
}

export default Book;