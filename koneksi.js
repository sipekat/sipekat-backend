const mysql = require('mysql');
require('dotenv').config();

//database
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

con.connect((err) => {
  if (err) throw err;
  console.log('Database terkoneksi');
});

module.exports = con;