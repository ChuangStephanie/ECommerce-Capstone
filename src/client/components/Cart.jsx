import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const removeFromCart = (productId) => {
    // Remove the item from the cart and update local storage
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    // Update the quantity of the item in the cart and update local storage
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} (Quantity: {item.quantity})
            <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotalPrice()}</p>
    </div>
  );
};

export default Cart;