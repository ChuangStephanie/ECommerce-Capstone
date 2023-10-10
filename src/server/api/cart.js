// Import necessary modules and functions
const express = require('express');
const router = express.Router();
const {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} = require('../db/cart');

// Get cart items
router.get('/', async (req, res, next) => {
  try {
    const cartItems = await getCartItems(req.user.id); 

    res.send({
      cartItems,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Add to cart
router.post('/add', async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    await addToCart(req.user.id, productId, quantity); 

    res.send({
      message: 'Product added to cart',
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Remove from cart
router.post('/remove', async (req, res, next) => {
  const { productId } = req.body;
  try {
    await removeFromCart(req.user.id, productId); 

    res.send({
      message: 'Product removed from cart',
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Update cart item quantity
router.post('/update', async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    await updateCartItemQuantity(req.user.id, productId, quantity); 

    res.send({
      message: 'Cart item quantity updated',
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
