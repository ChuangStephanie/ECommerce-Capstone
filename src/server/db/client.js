const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || "http://localhost:5432/lizardsplushies"; //'postgres://lizard_db_user:u4DKldHONhWkbQgJq5h5dOWeI1z5qM7r@dpg-cklvhfrj89us7391829g-a.ohio-postgres.render.com/lizard_db?ssl=true';

const db = new Client({
    connectionString,
    // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});



module.exports = db;
