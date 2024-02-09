import React from 'react';
import { ImPlus, ImMinus, ImInfo } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import BookAdd from './bookAdd';


const AdminBook = ({book, key, setID, onAdd, onRemove, isLoggedIn}) => {       

    const [images, setImages] = useState(null);
    const navigate = useNavigate();
    const id = book.id;
    console.log(id);


    useEffect(() => {
        fetch('https://picsum.photos/v2/list')
            .then(response => response.json())
            .then(data => setImages(data))
            .catch(error => console.error("Error fetching data: ", error))
    }, [])
    
    if(images != null){
        if (isLoggedIn === false){
            return(
                <h2>UNAUTHORIZED ACCESS</h2>
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
                            <button className="btn" onClick={() => {console.log(id); setID(id); navigate("bookEdit")}}>
                                <FaEdit />
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
export default AdminBook;