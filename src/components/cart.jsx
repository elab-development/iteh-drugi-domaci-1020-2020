import React from "react";
import CartBook from "./cartBook"

const Cart = ({cartBooks, onAdd, onRemove, onPurchase}) => {
  return (
    <div className="cartContainer">
        <h1>Your Cart</h1>
        <button className="btn" onClick={() => onPurchase()}>
          <p>Purchase</p>
        </button>
        <h2>Cart Items</h2>
        {cartBooks.map((book) => (
        <CartBook key={book.id} book={book} onAdd = {onAdd} onRemove = {onRemove}/>
      ))}

    </div>
  );
};

export default Cart;
