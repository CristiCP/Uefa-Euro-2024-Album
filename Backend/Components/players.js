const { getTeamsName } = require('./teams-api');


async function selectRandomPlayers(numberOfTeams) {
  const teams = getTeamsName();
  const selectedPlayerIds = new Set();
  const selectedPlayers = [];

  while (selectedPlayers.length < numberOfTeams) {
      const randomIndex = Math.floor(Math.random() * teams.length);
      const group = teams[randomIndex].temas;
      const randomIndexTeam = Math.floor(Math.random() * group.length);
      const team = group[randomIndexTeam].teamId;
      const players = await getPlayers(team);

      if (players.length !== 0) {
          const player = selectRandomPlayer(players);
          if (!selectedPlayerIds.has(player.id)) {
            selectedPlayerIds.add(player.id);
            selectedPlayers.push(player);
          }
      }
  }
  
  return Array.from(selectedPlayers);
}

function selectRandomPlayer(players) {
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex].player;
}


async function getPlayers(teamId, retries = 10, delay = 1000) {
  const fetch = (await import('node-fetch')).default;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/8.6.0'
    }
  };

  try {
    const response = await fetch('https://compstats.uefa.com/v1/player-ranking?competitionId=3&limit=30&offset=0&optionalFields=PLAYER%2CTEAM&order=DESC&phase=TOURNAMENT&seasonYear=2024&stats=minutes_played_official%2Cmatches_appearance%2Cgoals%2Cassists%2Ctop_speed%2Cdistance_covered&teamId=' + teamId, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching players:', err);
    if (retries > 0) {
      console.log(`Retrying... ${retries} retries left.`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return getPlayers(teamId, retries - 1, delay);
    } else {
      throw new Error('Max retries exceeded. Unable to fetch players.');
    }
  }
}

async function getPlayersCommonPack() {
    
    const numberOfPlayers = 5;
    const players = await selectRandomPlayers(numberOfPlayers);
    return players;
}

async function getPlayersRarePack() {
  const numberOfPlayers = 10;
    const players = await selectRandomPlayers(numberOfPlayers);
    return players;
}

async function getPlayersLegendaryPack() {
  const numberOfPlayers = 15;
    const players = await selectRandomPlayers(numberOfPlayers);
    return players;
}

module.exports = { getPlayersCommonPack,getPlayersRarePack,getPlayersLegendaryPack };