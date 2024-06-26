const connection = require('../Database/databaseConnection');
const jwt = require('jsonwebtoken');

const getAllTransfers = async (token, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    const query = `
      SELECT 
        t.id AS transfer_id,
        t.posted_time,
        u.*,   
        p.*     
      FROM transfers t
      JOIN users u ON t.user_id = u.id
      JOIN players p ON t.player_id = p.id
      WHERE u.id <> ?
      LIMIT ?, ?
    `;
    return new Promise((resolve, reject) => {
      connection.query(query, [userId, offset, limit], (error, results) => {
        if (error) {
          return reject(new Error('Error fetching transfers: ' + error.message));
        }
        const transfers = results.map(row => ({
          transferId: row.transfer_id,
          postedTime: row.posted_time,
          user: {
            id: row.id,
            username: row.username
          },
          player: {
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
          }
        }));
        resolve(transfers);
      });
    });
  } catch (error) {
    console.log('Invalid token');
  }
};


const postTransfer = async (req, res, io) => {
  const { token, playerId } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    const queryInsert = `
      INSERT INTO transfers (user_id, player_id, posted_time)
      VALUES (?, ?, NOW())
    `;
    const valuesInsert = [userId, playerId];
    connection.query(queryInsert, valuesInsert, async (error, results) => {
      if (error) {
        console.error('Error posting transfer:', error.message);
        return res.status(500).json({ error: 'Error posting transfer' });
      }
      const transferId = results.insertId;
      const querySelect = `
        SELECT 
          t.id AS transfer_id,
          t.posted_time,
          u.*,   
          p.*     
        FROM transfers t
        JOIN users u ON t.user_id = u.id
        JOIN players p ON t.player_id = p.id
        WHERE t.id = ?
      `;
      connection.query(querySelect, [transferId], (error, results) => {
        if (error) {
          console.error('Error fetching posted transfer:', error.message);
          return res.status(500).json({ error: 'Error fetching posted transfer' });
        }
        const postedTransfer = results[0]; 
        io.emit('newTransfer', {
          transferId: postedTransfer.transfer_id,
          postedTime: postedTransfer.posted_time,
          user: {
            id: postedTransfer.id,
            username: postedTransfer.username
          },
          player: {
            id: postedTransfer.id,
            internationalName: postedTransfer.internationalName,
            age: postedTransfer.age,
            birthDate: postedTransfer.birthDate,
            countryCode: postedTransfer.countryCode,
            fieldPosition: postedTransfer.fieldPosition,
            height: postedTransfer.height,
            imageUrl: postedTransfer.imageUrl,
            nationalJerseyNumber: postedTransfer.nationalJerseyNumber,
            nationalTeamId: postedTransfer.nationalTeamId,
            countryName: postedTransfer.countryName,
            weight: postedTransfer.weight,
            teamId: postedTransfer.teamId
          }
        });
        res.status(201).json({ transferId });
      });
    });
  } catch (error) {
    console.error('Error posting transfer:', error.message);
    res.status(500).json({ error: 'Error posting transfer' });
  }
};


module.exports = { getAllTransfers, postTransfer };
