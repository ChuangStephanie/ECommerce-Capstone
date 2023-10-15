const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://cs231951:231951@localhost:5432/lizardsplushies';

const db = new Client({
    connectionString,
    // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});



module.exports = db;
