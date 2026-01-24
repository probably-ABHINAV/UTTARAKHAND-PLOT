require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
console.log("Connecting to:", connectionString.replace(/:([^:@]+)@/, ':****@'));

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

pool.connect().then(client => {
    console.log("Connected successfully!");
    return client.query('SELECT NOW()');
}).then(res => {
    console.log("Time:", res.rows[0]);
    pool.end();
}).catch(err => {
    console.error("Connection failed:", err);
    pool.end();
});
