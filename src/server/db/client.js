const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://lizards_plushies_user:FVO8HMBA5YNcDPSmsKam1h2VfdDr1HPL@dpg-ck3kkm7qj8ts73faggug-a.ohio-postgres.render.com/lizards_plushies?ssl=true';

const db = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});



module.exports = db;
