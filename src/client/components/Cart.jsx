import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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
  }

  const updateCartItemQuantity = (productId, quantity) => {
    // Update the quantity of the item in the cart and update local storage
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  const totalPrice = calculateTotalPrice();
  const totalPriceTitle = 'Total Price';

  const handleClick = async () => {
    try {
      const res = await fetch('https://lizardsplushies.onrender.com/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: totalPriceTitle,
                },
                unit_amount: parseInt(Math.ceil(totalPrice * 100)),
              },
              quantity: 1,
            },
          ],
        }),
      });

      if (res.ok) {
        const body = await res.json();
        window.location.href = body.url;
      } else {
        // Display an error toast notification for a failed response
        toast.error('Error creating a checkout session. Please try again later.');
      }
    } catch (error) {
      // Handle network or other errors and display an error toast notification
      toast.error('An error occurred while processing your request. Please try again later.');
    }
  };

  const confirm = () => {
    const confirm = window.confirm('Confirm purchase?');
    if (confirm) {
      handleClick();
    }
  };

  return (
    <div className='cart-page'>
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="item-details">
                <div>
                  <strong>{item.name}</strong> - ${item.price}
                </div>
                <div>Quantity: {item.quantity}</div>
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-actions">
                <button className='item-button'
                  onClick={() => {
                    if (item.quantity >= 1) {
                      updateCartItemQuantity(item.id, item.quantity + 1)
                    }
                  }}
                >
                  +
                </button>
                <button className='item-button'
                  onClick={() => {
                    if (item.quantity > 1) {
                      updateCartItemQuantity(item.id, item.quantity - 1)
                    }
                  }}
                >
                  -
                </button>
                <button className='remove-button' onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <p className="total-price">Total: ${parseInt(Math.ceil(totalPrice * 100)) / 100}</p>
        {totalPrice > 0 ? (
          <button className="checkout-button" onClick={confirm}>Checkout</button>
        ) : (
          <button className="add-items-button" onClick={() => navigate('/products')}>Add Items</button>
        )}
      </div>
    </div>
  );
}

export default Cart;
