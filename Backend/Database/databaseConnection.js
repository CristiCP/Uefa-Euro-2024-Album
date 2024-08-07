const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.host || 'localhost',
  user: process.env.user || 'root',
  password: process.env.password || '',
  database: process.env.database || 'euro2024',
  port: process.env.PORTDB || ''
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
