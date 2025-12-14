const { Pool } = require("pg");
require("dotenv").config();

// ühendus db-ga)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// kontrollib ühendust
pool.connect((err, client, release) => {
    if (err) {
        console.error("Error connecting to database:", err.stack);
        process.exit(1);
    }
    console.log("Database connected successfully");
    release();
});

pool.query(
    // DROP TABLE IF EXISTS posts;
    `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        body VARCHAR(1000) NOT NULL,
        date TIMESTAMP DEFAULT NOW()
    );
`
)
    .then(() => {
        console.log("Tables created successfully");
    })
    .catch(err => {
        console.error("Error creating tables:", err);
        process.exit(1);
    });

module.exports = pool;
