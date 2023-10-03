const db = require('./client')
const { createUser } = require('./users')
const { createProduct } = require('./products')

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
    isAdmin: false
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
    isAdmin: false
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
    isAdmin: false
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
    isAdmin: false
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false
  },
  {
    name: 'Jamie Chuang',
    email: 'MxJChuang@money.com',
    password: 'morbidcuriosity',
    isAdmin: true
  }
]

const products = [
  {
    name: 'Product 1',
    price: 19.99,
    description: 'Description for Product 1',
    category: 'Plushy',
    onSale: false
  },
  {
    name: 'Product 2',
    price: 29.99,
    description: 'Description for Product 2',
    category: 'Keychain',
    onSale: false
  },
  {
    name: 'Product 3',
    price: 9.99,
    description: 'Description for Product 3',
    category: 'Plushy',
    onSale: true
  },
  {
    name: 'Product 4',
    price: 39.99,
    description: 'Description for Product 4',
    category: 'Keychain',
    onSale: false
  },
  {
    name: 'Product 5',
    price: 49.99,
    description: 'Description for Product 5',
    category: 'Plushy',
    onSale: true
  },
]

const dropTables = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `)
  } catch (err) {
    throw err
  }
}

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAdmin VARCHAR(255) NOT NULL
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        description TEXT,
        category TEXT,
        onSale VARCHAR(255) NOT NULL
      );
    `)
  } catch (err) {
    throw err
  }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin
      })
    }
    console.log('User seed data inserted successfully.')
  } catch (error) {
    console.error('Error inserting user seed data:', error)
  }
}

const insertProducts = async () => {
  try {
    for (const product of products) {
      await createProduct({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        onSale: product.onSale
      })
    }
    console.log('Product seed data inserted successfully.')
  } catch (error) {
    console.error('Error inserting product seed data:', error)
  }
}

const seedDatabase = async () => {
  try {
    db.connect()
    await dropTables()
    await createTables()
    await insertUsers()
    await insertProducts()
  } catch (err) {
    throw err
  } finally {
    db.end()
  }
}

seedDatabase()
