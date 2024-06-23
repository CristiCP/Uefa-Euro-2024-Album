const connection = require('../Database/databaseConnection');

async function getAllPlayers() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM players';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching players from database:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
}

module.exports = {getAllPlayers};