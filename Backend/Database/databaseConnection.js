const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.host || 'roundhouse.proxy.rlwy.net',
  user: process.env.user || 'root',
  password: process.env.password || 'tZBpwpKKZdRkyuYXHArTEgjoeLVRJKQd',
  database: process.env.database || 'railway',
  port: process.env.PORTDB || '23256'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;

//mysql://root:tZBpwpKKZdRkyuYXHArTEgjoeLVRJKQd@roundhouse.proxy.rlwy.net:23256/railway