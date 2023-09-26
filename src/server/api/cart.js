const express = require('express');
const cartRouter = express.Router();
const {
  GetCartItems,
  AddToCart,
  RemoveFromCart,
  UpdateCartItemQuantity,
} = require('../db/cart'); // Import database functions for cart management

const { requireUser } = require('./utils'); // Import middleware for user authentication

// GET /api/cart
cartRouter.get('/', requireUser, async (req, res, next) => {
  try {
    // Get cart items from the database for the authenticated user
    const userId = req.user.id; // Assuming you have user authentication
    const cartItems = await GetCartItems(userId);
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

// POST /api/cart
cartRouter.post('/', requireUser, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Assuming you have user authentication

    // Add the item to the cart in the database
    const cartItem = await AddToCart(userId, productId, quantity);
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/:productId
cartRouter.delete('/:productId', requireUser, async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id; // Assuming you have user authentication

    // Remove the item from the cart in the database
    await RemoveFromCart(userId, productId);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/cart/:productId
cartRouter.patch('/:productId', requireUser, async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id; // Assuming you have user authentication

    // Update the quantity of the cart item in the database
    const updatedCartItem = await UpdateCartItemQuantity(
      userId,
      productId,
      quantity
    );
    res.json(updatedCartItem);
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
