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

const filterDuplicates = (players) => {
  const playerCountMap = {};
  const result = [];
  players.forEach(player => {
    if (playerCountMap[player.id]) {
      playerCountMap[player.id]++;
    } else {
      playerCountMap[player.id] = 1;
    }
  });
  players.forEach(player => {
    if (playerCountMap[player.id] > 1 && !result.some(p => p.id === player.id)) {
      result.push(player);
    }
  });
  return result;
};

const getPlayersDetailsForUser = async (req, res) => {
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
    const userId = userRows.id;
    const playersQuery = `
      SELECT
        p.*
      FROM
        players p
      JOIN
        usercards uc ON p.id = uc.player_id
      LEFT JOIN
        transfers t ON p.id = t.player_id AND t.user_id = ?
      WHERE
        uc.user_id = ?
        AND t.id IS NULL
    `;
    const playersRows = await query(playersQuery, [userId, userId]);
    if (!playersRows || playersRows.length === 0) {
      return res.status(404).json({ success: false, message: 'No players found for the user' });
    }
    const players = playersRows.map(row => ({
      id: row.id,
      internationalName: row.internationalName,
      age: row.age,
      birthDate: row.birthDate,
      countryCode: row.countryCode,
      fieldPosition: row.fieldPosition,
      height: row.height,
      imageUrl: row.imageUrl,
      nationalJerseyNumber: row.nationalJerseyNumber,
      nationalTeamId: row.nationalTeamId,
      countryName: row.countryName,
      weight: row.weight,
      teamId: row.teamId
    }));
    const filteredPlayers = filterDuplicates(players);
    const pageSize = 20;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;
    const paginatedPlayers = filteredPlayers.slice(offset, offset + pageSize);
    return res.json({ success: true, players: paginatedPlayers });
  } catch (error) {
    console.error('Error retrieving players details:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving players details' });
  }
};


module.exports = {getAllPlayers, getPlayersForUser, getPlayersDetailsForUser};