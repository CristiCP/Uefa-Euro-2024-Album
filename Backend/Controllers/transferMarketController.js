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
        u.id AS user_id,
        u.username,
        p.id AS player_id,
        p.internationalName,
        p.age,
        p.birthDate,
        p.countryCode,
        p.fieldPosition,
        p.height,
        p.imageUrl,
        p.nationalJerseyNumber,
        p.nationalTeamId,
        p.countryName,
        p.weight,
        p.teamId
      FROM transfers t
      JOIN users u ON t.user_id = u.id
      JOIN players p ON t.player_id = p.id
      WHERE u.id <> ?
      LIMIT ?, ?
    `;
    return new Promise((resolve, reject) => {
      connection.query(query, [userId, offset, limit], (error, results) => {
        if (error) {
          console.error('Error fetching transfers:', error.message);
          return reject(new Error('Error fetching transfers'));
        }
        const transfers = results.map(row => ({
          transferId: row.transfer_id,
          postedTime: row.posted_time,
          user: {
            id: row.user_id,
            username: row.username
          },
          player: {
            id: row.player_id,
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
    console.error('Invalid token or error fetching transfers:', error.message);
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
          u.id AS user_id,
          u.username,
          p.id AS player_id,
          p.internationalName,
          p.age,
          p.birthDate,
          p.countryCode,
          p.fieldPosition,
          p.height,
          p.imageUrl,
          p.nationalJerseyNumber,
          p.nationalTeamId,
          p.countryName,
          p.weight,
          p.teamId
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
            id: postedTransfer.user_id,
            username: postedTransfer.username
          },
          player: {
            id: postedTransfer.player_id,
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

const createExchangeOffer = async (req, res) => {
  const { token, playerOfferingId, playerOfferedId, offeredUsername } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userOfferingId = decoded.id;
    const queryGetUserId = 'SELECT id FROM users WHERE username = ?';
    connection.query(queryGetUserId, [offeredUsername], (error, results) => {
      if (error) {
        console.error('Error fetching user ID:', error.message);
        return res.status(500).json({ error: 'Error fetching user ID' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      const userOfferedId = results[0].id;
      const queryCheckOfferedTransfer = 'SELECT COUNT(*) AS count FROM transfers WHERE user_id = ? AND player_id = ?';
      connection.query(queryCheckOfferedTransfer, [userOfferedId, playerOfferedId], async (error, offeredResult) => {
        if (error) {
          console.error('Error checking player in offered transfers:', error.message);
          return res.status(500).json({ error: 'Error checking player in offered transfers' });
        }
        
        if (offeredResult[0].count === 0) {
          return res.status(400).json({ error: 'The offered user does not have the player in transfers' });
        }

        const queryInsertExchange = `
          INSERT INTO exchanges (userOfferingId, userOfferedId, playerOfferingId, playerOfferedId)
          VALUES (?, ?, ?, ?)
        `;
        const valuesInsertExchange = [userOfferingId, userOfferedId, playerOfferingId, playerOfferedId];
        connection.query(queryInsertExchange, valuesInsertExchange, (error, results) => {
          if (error) {
            console.error('Error creating exchange offer:', error.message);
            return res.status(500).json({ error: 'Error creating exchange offer' });
          }
          const exchangeId = results.insertId;
          res.status(201).json({ exchangeId });
        });
      });
    });
  } catch (error) {
    console.error('Error creating exchange offer:', error.message);
    res.status(500).json({ error: 'Error creating exchange offer' });
  }
};

const getAllExchangeOffers = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    const query = `
      SELECT 
        e.id AS exchange_id,
        uOffering.username AS userOffering,
        pOffering.id AS playerOffering_id,
        pOffering.internationalName AS playerOffering_internationalName,
        pOffering.age AS playerOffering_age,
        pOffering.birthDate AS playerOffering_birthDate,
        pOffering.countryCode AS playerOffering_countryCode,
        pOffering.fieldPosition AS playerOffering_fieldPosition,
        pOffering.height AS playerOffering_height,
        pOffering.imageUrl AS playerOffering_imageUrl,
        pOffering.nationalJerseyNumber AS playerOffering_nationalJerseyNumber,
        pOffering.nationalTeamId AS playerOffering_nationalTeamId,
        pOffering.countryName AS playerOffering_countryName,
        pOffering.weight AS playerOffering_weight,
        pOffering.teamId AS playerOffering_teamId,
        pOffered.id AS playerOffered_id,
        pOffered.internationalName AS playerOffered_internationalName,
        pOffered.age AS playerOffered_age,
        pOffered.birthDate AS playerOffered_birthDate,
        pOffered.countryCode AS playerOffered_countryCode,
        pOffered.fieldPosition AS playerOffered_fieldPosition,
        pOffered.height AS playerOffered_height,
        pOffered.imageUrl AS playerOffered_imageUrl,
        pOffered.nationalJerseyNumber AS playerOffered_nationalJerseyNumber,
        pOffered.nationalTeamId AS playerOffered_nationalTeamId,
        pOffered.countryName AS playerOffered_countryName,
        pOffered.weight AS playerOffered_weight,
        pOffered.teamId AS playerOffered_teamId
      FROM exchanges e
      JOIN users uOffering ON e.userOfferingId = uOffering.id
      JOIN players pOffering ON e.playerOfferingId = pOffering.id
      JOIN players pOffered ON e.playerOfferedId = pOffered.id
      WHERE e.userOfferedId = ?
    `;
    return new Promise((resolve, reject) => {
      connection.query(query, [userId], (error, results) => {
        if (error) {
          console.error('Error fetching exchange offers:', error.message);
          return reject(new Error('Error fetching exchange offers'));
        }
        const exchangeOffers = results.map(row => ({
          exchangeId: row.exchange_id,
          userOffering: row.userOffering,
          playerOffering: {
            id: row.playerOffering_id,
            internationalName: row.playerOffering_internationalName,
            age: row.playerOffering_age,
            birthDate: row.playerOffering_birthDate,
            countryCode: row.playerOffering_countryCode,
            fieldPosition: row.playerOffering_fieldPosition,
            height: row.playerOffering_height,
            imageUrl: row.playerOffering_imageUrl,
            nationalJerseyNumber: row.playerOffering_nationalJerseyNumber,
            nationalTeamId: row.playerOffering_nationalTeamId,
            countryName: row.playerOffering_countryName,
            weight: row.playerOffering_weight,
            teamId: row.playerOffering_teamId
          },
          playerOffered: {
            id: row.playerOffered_id,
            internationalName: row.playerOffered_internationalName,
            age: row.playerOffered_age,
            birthDate: row.playerOffered_birthDate,
            countryCode: row.playerOffered_countryCode,
            fieldPosition: row.playerOffered_fieldPosition,
            height: row.playerOffered_height,
            imageUrl: row.playerOffered_imageUrl,
            nationalJerseyNumber: row.playerOffered_nationalJerseyNumber,
            nationalTeamId: row.playerOffered_nationalTeamId,
            countryName: row.playerOffered_countryName,
            weight: row.playerOffered_weight,
            teamId: row.playerOffered_teamId
          }
        }));
        resolve(exchangeOffers);
      });
    });
  } catch (error) {
    console.error('Invalid token or error fetching exchange offers:', error.message);
  }
};

const acceptOffer = async (token, offeredUsername, playerOfferingId, playerOfferedId, exchangeId) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userOfferedId = decoded.id;
    const queryGetUserId = 'SELECT id FROM users WHERE username = ?';
    connection.query(queryGetUserId, [offeredUsername], async (error, userOfferingResult) => {
      if (error) {
        console.error('Error fetching user ID:', error.message);
        return false; 
      }
      if (userOfferingResult.length === 0) {
        console.log('User offering the exchange not found');
        return false; 
      }
      const userOfferingId = userOfferingResult[0].id;
      const queryCheckOfferedPlayer = 'SELECT COUNT(*) AS count FROM transfers WHERE user_id = ? AND player_id = ?';
      connection.query(queryCheckOfferedPlayer, [userOfferedId, playerOfferedId], async (error, playerOfferedResult) => {
        if (error) {
          console.error('Error checking player offered:', error.message);
          return false; 
        }
        if (playerOfferedResult[0].count === 0) {
          console.log('Player offered does not exist in transfers table');
          return false; 
        }
        const deleteTransferQuery = 'DELETE FROM transfers WHERE user_id = ? AND player_id = ?';
        connection.query(deleteTransferQuery, [userOfferedId, playerOfferedId], async (error, _) => {
          if (error) {
            console.error('Error deleting transfer:', error.message);
            return false; 
          }
          const updateCardsQuery1 = `
            UPDATE usercards
            SET player_id = CASE
              WHEN user_id = ? AND player_id = ? THEN ?
            END
            WHERE (user_id = ? AND player_id = ?)
            LIMIT 1
          `;
            const updateValues1 = [
              userOfferingId, playerOfferingId, playerOfferedId,
              userOfferingId, playerOfferingId, playerOfferedId
            ];
            connection.query(updateCardsQuery1, updateValues1, async (error, _) => {
              if (error) {
                console.error('Error updating usercards:', error.message);
                return false; 
              }});
          const updateCardsQuery = `
          UPDATE usercards
          SET player_id = CASE
            WHEN user_id = ? AND player_id = ? THEN ?
          END
          WHERE (user_id = ? AND player_id = ?)
          LIMIT 1
        `;
          const updateValues = [
            userOfferedId, playerOfferedId, playerOfferingId,
            userOfferedId, playerOfferedId, playerOfferingId
          ];
          connection.query(updateCardsQuery, updateValues, async (error, _) => {
            if (error) {
              console.error('Error updating usercards:', error.message);
              return false; 
            }
            const deleteExchangeOffersQuery = `
              DELETE FROM exchanges 
              WHERE userOfferedId = ? AND playerOfferedId = ?
            `;
            connection.query(deleteExchangeOffersQuery, [userOfferedId, playerOfferedId], async (error, _) => {
              if (error) {
                console.error('Error deleting exchange offers:', error.message);
                return false; 
              }
              const deleteExchangeOffersQuery = `
              DELETE FROM exchanges 
              WHERE userOfferingId = ? AND playerOfferingId = ?
            `;
              connection.query(deleteExchangeOffersQuery, [userOfferingId, playerOfferingId], async (error, _) => {
              if (error) {
                console.error('Error deleting exchange offers:', error.message);
                return false; 
              }});
              const deleteExchangeQuery = 'DELETE FROM exchanges WHERE id = ?';
              connection.query(deleteExchangeQuery, [exchangeId], async (error, _) => {
                if (error) {
                  console.error('Error deleting exchange:', error.message);
                  return false;
                }
                return true; 
              });
            });
          });
        });
      });
    });
  } catch (error) {
    console.error('Error accepting offer:', error.message);
    return false;
  }
};

module.exports = { getAllTransfers, postTransfer, createExchangeOffer, getAllExchangeOffers, acceptOffer };
