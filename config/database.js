const mysql = require('mysql');
const utils = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'rhnode'
});

pool.query = utils.promisify(pool.query);

module.exports = pool;
