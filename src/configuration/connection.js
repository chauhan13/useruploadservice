const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DBHOST || "localhost",
  user: process.env.DBUSER || "root",
  password: process.env.DBPASSWORD || "password",
  database: process.env.DBNAME || "file_uploader",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


const db = pool.promise();

module.exports = db;
