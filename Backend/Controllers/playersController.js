const jwt = require('jsonwebtoken');
const connection = require('../Database/databaseConnection');
const { promisify } = require('util');

const query = promisify(connection.query).bind(connection);

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

const getPlayersForUser = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
  }
  try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const username = decoded.username;
      const userQuery = 'SELECT id FROM users WHERE username = ?';
      const [userRows] = await query(userQuery, [username]);
      if (!userRows || userRows.length === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      const user = {
        id: userRows.id,
      };
      userId = user.id;
      const playersQuery = 'SELECT * FROM usercards WHERE user_id = ?';
      const players = await query(playersQuery, [userId]);
      return res.json({ success: true, players });
  } catch (error) {
      console.error('Error retrieving players:', error);
      return res.status(500).json({ success: false, message: 'Error retrieving players' });
  }
};

module.exports = {getAllPlayers, getPlayersForUser};