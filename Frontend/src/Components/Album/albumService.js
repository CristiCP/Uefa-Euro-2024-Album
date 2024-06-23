import axios from 'axios';

const fetchTeams = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_TEAMS_API);
    const updatedData = response.data.map(group => ({
      ...group,
      teams: group.teams.sort((a, b) => {
        if (a.points !== b.points) {
          return b.points - a.points;
        }
        if (a.goalDifference !== b.goalDifference) {
          return b.goalDifference - a.goalDifference;
        }
        return a.rank - b.rank;
      })
    }));
    return updatedData;
  } catch (err) {
    console.error("Fetching the teams failed!", err);
    throw err;
  }
};

const fetchPlayersByTeam = async (teamId) => {
  try {
    const response = await axios.get(import.meta.env.VITE_PLAYERS_API);
    const teamPlayers = response.data.filter(player => player.teamId == teamId);

    return sortPlayersByPosition(teamPlayers);
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

const sortPlayersByPosition = (players) => {
  const positionOrder = {
    GOALKEEPER: 1,
    DEFENDER: 2,
    MIDFIELDER: 3,
    FORWARD: 4,
  };

  return players.sort((a, b) => {
    const positionA = a.fieldPosition;
    const positionB = b.fieldPosition;

    if (positionOrder[positionA] === undefined && positionOrder[positionB] === undefined) {
      return 0;
    } else if (positionOrder[positionA] === undefined) {
      return 1;
    } else if (positionOrder[positionB] === undefined) {
      return -1;
    } else {
      return positionOrder[positionA] - positionOrder[positionB];
    }
  });
};

export { fetchTeams, fetchPlayersByTeam, sortPlayersByPosition };