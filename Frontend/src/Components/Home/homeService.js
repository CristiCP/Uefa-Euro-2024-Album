import axios from 'axios';

const fetchTeamsData = async () => {
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

export { fetchTeamsData };