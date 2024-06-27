import axios from 'axios';

const fetchTeams = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_TEAMS_API);
    console.log(response.data);
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

const fetchUserPlayers = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    };
    const response = await axios.get(import.meta.env.VITE_USER_PLAYERS_API, config);
    return response.data.players; 
  } catch (error) {
    throw new Error('Error fetching user players');
  }
};

export { fetchTeams, fetchPlayersByTeam, sortPlayersByPosition, fetchUserPlayers };