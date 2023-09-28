const db = require('./client')
const bcrypt = require('bcrypt')
const SALT_COUNT = 10

const createUser = async ({ name, email, password, isAdmin }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        INSERT INTO users(name, email, password, isAdmin)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
      [name, email, hashedPassword, isAdmin]
    )

    return user
  } catch (err) {
    throw err
  }
}

const getUser = async ({ email, password }) => {
  if (!email || !password) {
    return
  }
  try {
    const user = await getUserByEmail(email)
    if (!user) return
    const hashedPassword = user.password
    const passwordsMatch = await bcrypt.compare(password, hashedPassword)
    if (!passwordsMatch) return
    delete user.password
    return user
  } catch (err) {
    throw err
  }
}

const updateUser = async (userId, updatedUserData) => {
  try {
    const { name, email, password, isAdmin } = updatedUserData;

    const query = `
      UPDATE users
      SET name = $1, email = $2, password = $3, isAdmin = $4
      WHERE id = $5
      RETURNING *;
    `;

    const values = [name, email, password, isAdmin, userId];

    const { rows: [updatedUser] } = await db.query(query, values);

    if (!updatedUser) {
      throw new Error('Product not found');
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};


const getAllUsers = async () => {
  try {
    const query = `
        SELECT * FROM users;
      `

    const { rows: users } = await db.query(query)

    return users
  } catch (error) {
    throw error
  }
}

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECT * 
        FROM users
        WHERE email=$1;`,
      [email]
    )

    if (!user) {
      return
    }
    return user
  } catch (err) {
    throw err
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await db.query(`
        SELECT id, name, email, password, isAdmin
        FROM users
        WHERE id=${userId}
      `)

    if (!user) {
      throw {
        name: 'UserNotFoundError',
        message: 'A user with that id does not exist',
      }
    }

    return user
  } catch (error) {
    throw error
  }
}

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
}
