import React from 'react';
import { ImCart } from "react-icons/im";
import { Link } from "react-router-dom";

function NavBar({cartNum}){
    return(
        <div className='navBar'>
            <Link to = "/"><h2>Book Catalogue</h2></Link>   
            <Link to = "/contact" style={{ marginLeft: 20 }}><h2>Contact</h2></Link>  
            <Link to = "/cart" className="cart-items">
                <ImCart style={{ marginLeft: 10}} />
                <div className="cart-num">{cartNum}</div>
            </Link>
            <Link to = "/register"><h2 style={{ marginLeft: 10}}>Register</h2></Link>            
        </div>
    )
}

export default NavBar;