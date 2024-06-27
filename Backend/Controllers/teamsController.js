const connection = require('../Database/databaseConnection');

async function getAllGroupsAndTeams() {
    try {
      const groups = await new Promise((resolve, reject) => {
        const query = 'SELECT * FROM GroupsTournament';
        connection.query(query, (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
  
      const groupPromises = groups.map(group => {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM Teams WHERE groupId = ?';
          connection.query(query, [group.id], (err, results) => {
            if (err) return reject(err);
            resolve({
              group: group.groupName,
              teams: results.map(team => ({
                teamName: team.teamName,
                teamId: team.teamId,
                teamImage: team.teamImage,
                rank: team.rank,
                points: team.points,
                played: team.played,
                qualified: team.qualified,
                won: team.won,
                lost: team.lost,
                drawn: team.drawn,
                goalDifference: team.goalDifference
              }))
            });
          });
        });
      });
  
      const allGroupsAndTeams = await Promise.all(groupPromises);
      return allGroupsAndTeams;
    } catch (err) {
      console.error('Error fetching groups and teams:', err);
    }
  }
  
  module.exports = { getAllGroupsAndTeams };