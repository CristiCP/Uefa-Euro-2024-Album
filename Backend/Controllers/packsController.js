const {getAllPlayers} = require('../Controllers/playersController');
const { promisify } = require('util');
const connection = require('../Database/databaseConnection');
const jwt = require('jsonwebtoken');

const query = promisify(connection.query).bind(connection);

async function getUserIdByUsername(username) {
  try {
    const userQuery = 'SELECT id FROM users WHERE username = ?';
    const [userRows] = await query(userQuery, [username]);
    if (!userRows || userRows.length === 0) {
      console.log('User not found');
    }
    const user = {
      id: userRows.id,
    };
    userId = user.id;
    return userId;
  } catch (error) {
    console.log('Error fetching the user:',error);
  }
}

async function selectRandomPlayers(numberOfPlayers) {
    const players = await getAllPlayers();
    const selectedPlayerIds = new Set();
    const selectedPlayers = [];
    while (selectedPlayers.length < numberOfPlayers) {
        const randomIndex = Math.floor(Math.random() * players.length);
        if (!selectedPlayerIds.has(players[randomIndex].id)) {
            selectedPlayerIds.add(players[randomIndex].id);
            selectedPlayers.push(players[randomIndex]);
        }
    }
    return Array.from(selectedPlayers);
  }

  async function getPlayersPack(selectedPack, token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const username = decoded.username;
      const userId = await getUserIdByUsername(username);
      let numberOfPlayers;
      switch (selectedPack) {
        case 'Common Pack':
          numberOfPlayers = 5;
          break;
        case 'Rare Pack':
          numberOfPlayers = 10;
          break;
        case 'Legendary Pack':
          numberOfPlayers = 15;
          break;
        default:
          console.log('Invalid pack type');
      }
      const players = await selectRandomPlayers(numberOfPlayers);
      const insertQuery = 'INSERT INTO usercards (user_id, player_id) VALUES ?';
      const values = players.map(player => [userId, player.id]);
      await query(insertQuery, [values]);
      return players;
    } catch (error) {
      console.error('Error opening pack:', error);
    }
  }

module.exports = { getPlayersPack};