const db = require('./client');

const getCartItems = async (userId) => {
  try {
    const query = `
      SELECT * FROM cart_items
      WHERE user_id = $1;
    `;

    const values = [userId];

    const { rows: cartItems } = await db.query(query, values);

    return cartItems;
  } catch (error) {
    throw error;
  }
};

const addToCart = async (userId, productId, quantity) => {
  try {
    const query = `
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [userId, productId, quantity];

    const { rows: [cartItem] } = await db.query(query, values);

    return cartItem;
  } catch (error) {
    throw error;
  }
};

const removeFromCart = async (userId, productId) => {
  try {
    const query = `
      DELETE FROM cart_items
      WHERE user_id = $1 AND product_id = $2
      RETURNING *;
    `;

    const values = [userId, productId];

    const { rows: [removedCartItem] } = await db.query(query, values);

    return removedCartItem;
  } catch (error) {
    throw error;
  }
};

const updateCartItemQuantity = async (userId, productId, quantity) => {
  try {
    const query = `
      UPDATE cart_items
      SET quantity = $1
      WHERE user_id = $2 AND product_id = $3
      RETURNING *;
    `;

    const values = [quantity, userId, productId];

    const { rows: [updatedCartItem] } = await db.query(query, values);

    return updatedCartItem;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
};