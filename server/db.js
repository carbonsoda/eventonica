const Pool = require('pg').Pool;
const db = require('./config');

const pool = new Pool({
    user: db.DB_USER,
    password: db.DB_PASSWORD,
    host: 'localhost',
    port: db.DB_PORT,
    database: db.DB_NAME
});


module.exports = pool;