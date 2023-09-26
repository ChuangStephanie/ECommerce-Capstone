const db = require('./client')
const { createUser } = require('./users')
const { createProduct } = require('./products')

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
    isAdmin: false,
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
    isAdmin: false,
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
    isAdmin: false,
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
    isAdmin: false,
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
  },
  {
    name: 'Jamie Chuang',
    email: 'MxJChuang@money.com',
    password: 'morbidcuriosity',
    isAdmin: true,
  },
  {
    name: 'Larry David',
    email: 'Larry@example.com',
    password: 'password987',
    isAdmin: false,
  },
  {
    name: 'David Goggins',
    email: 'Goggins@example.com',
    password: 'goggins123',
    isAdmin: false,
  },
  {
    name: 'Joe Rogan',
    email: 'Rogan@example.com',
    password: 'rogan456',
    isAdmin: false,
  },
  {
    name: 'Bijan Robinson',
    email: 'Bijan@example.com',
    password: 'bijan789',
    isAdmin: false,
  },
  {
    name: 'Manny Machado',
    email: 'manny@example.com',
    password: 'manny159',
    isAdmin: false,
  },
]

const products = [
  {
    name: 'Product 1',
    price: 19.99,
    description: 'Description for Product 1',
  },
  {
    name: 'Product 2',
    price: 29.99,
    description: 'Description for Product 2',
  },
  {
    name: 'Product 3',
    price: 9.99,
    description: 'Description for Product 3',
  },
  {
    name: 'Product 4',
    price: 39.99,
    description: 'Description for Product 4',
  },
  {
    name: 'Product 5',
    price: 49.99,
    description: 'Description for Product 5',
  },
  {
    name: 'Product 6',
    price: 4.99,
    description: 'Description for product 6',
  },
  {
    name: 'Product 7',
    price: 14.99,
    description: 'Description for product 7',
  },
  {
    name: 'Product 8',
    price: 24.99,
    description: 'Description for product 8',
  },
  {
    name: 'Product 9',
    price: 34.99,
    description: 'Description for product 9',
  },
  {
    name: 'Product 10',
    price: 44.99,
    description: 'Description for product 10',
  },
  {
    name: 'Product 11',
    price: 9.99,
    description: 'Description for product 11',
  },
  {
    name: 'Product 12',
    price: 4.99,
    description: 'Description for product 12',
  },
  {
    name: 'Product 13',
    price: 14.99,
    description: 'Description for product 13',
  },
  {
    name: 'Product 14',
    price: 12.99,
    description: 'Description for product 14',
  },
  {
    name: 'Product 15',
    price: 34.99,
    description: 'Description for product 15',
  },
  {
    name: 'Product 16',
    price: 3.99,
    description: 'Description for product 16',
  },
  {
    name: 'Product 17',
    price: 15.99,
    description: 'Description for product 17',
  },
  {
    name: 'Product 18',
    price: 29.99,
    description: 'Description for product 18',
  },
  {
    name: 'Product 19',
    price: 9.99,
    description: 'Description for product 19',
  },
  {
    name: 'Product 20',
    price: 19.99,
    description: 'Description for product 20',
  },
]

const dropTables = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS users, products;
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
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        description TEXT
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
