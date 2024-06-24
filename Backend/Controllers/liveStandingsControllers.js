let teams = [];

async function fetchTeams() {
  const fetch = (await import('node-fetch')).default;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/8.6.0'
    }
  };

  try {
    const response = await fetch('https://standings.uefa.com/v1/standings?competitionId=3&phase=TOURNAMENT&seasonYear=2024', options);
    const data = await response.json();
    teams = data;
  } catch (err) {
    console.error(err);
  }
}

async function getLiveStandings() {
  await fetchTeams();
  if (teams.length === 0) {
    console.error("Fetching the teams failed!");
    return [];
  } else {
    const teams_names = teams.map(event => ({
      group: event.group.metaData.groupName,
      teams: event.items.map(item => ({
        teamName: item.team.internationalName,
        teamId: item.team.id,
        teamImage: item.team.mediumLogoUrl,
        rank: item.rank,
        points: item.points,
        played: item.played,
        qualified : item.qualified,
        won: item.won,
        lost: item.lost,
        drawn: item.drawn,
        goalDifference: item.goalDifference
      }))
    }));
    return teams_names;
  }
}

module.exports = { getLiveStandings };