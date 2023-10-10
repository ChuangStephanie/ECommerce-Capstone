// cartController.js
const db = require('./client');

// Get cart items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await db.query('SELECT * FROM cart_items WHERE user_id = $1', [req.user.id]);
    res.json(cartItems.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart items' });
  }
};


const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; 

  try {
    await db.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)', [userId, productId, quantity]);
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding product to cart' });
  }
};


const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    await db.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing product from cart' });
  }
};

const updateCartItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
   
    await db.query('UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3', [quantity, userId, productId]);
    res.json({ message: 'Cart item quantity updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating cart item quantity' });
  }
};

module.exports = { getCartItems, addToCart, removeFromCart, updateCartItemQuantity };
