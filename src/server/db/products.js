const db = require('./client');

const createProduct = async ({ name, price, description }) => {
  try {
    const query = `
      INSERT INTO products (name, price, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [name, price, description];

    const { rows: [product] } = await db.query(query, values);

    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
};
