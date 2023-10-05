const db = require('./client');

const createProduct = async ({ name, price, description, category, onSale, image }) => {
  try {
    const query = `
      INSERT INTO products (name, price, description, category, onSale, image)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [name, price, description, category, onSale, image];

    const { rows: [product] } = await db.query(query, values);

    return product;

  } catch (error) {
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    const query = `
      SELECT * FROM products;
    `;

    const { rows: products } = await db.query(query);

    return products;
  } catch (error) {
    throw error;
  }
};

const getSingleProduct = async (productId) => {
  try {
    const query = `
      SELECT * FROM products
      WHERE id = $1;
    `;

    const values = [productId]

    const { rows: [product] } = await db.query(query, values);

    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (productId, updatedProductData) => {
  try {
    const { name, price, description, category, onSale, image } = updatedProductData;

    const query = `
      UPDATE products
      SET name = $1, price = $2, description = $3, category = $4, onSale = $5, image = $6
      WHERE id = $7
      RETURNING *;
    `;

    const values = [name, price, description, category, onSale, image, productId];

    const { rows: [updatedProduct] } = await db.query(query, values);

    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const query = `
      DELETE FROM products
      WHERE id = $1
      RETURNING *;
    `;

    const values = [productId];

    const { rows: [deletedProduct] } = await db.query(query, values);

    if (!deletedProduct) {
      throw new Error('Product not found');
    }

    return deletedProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct
};
