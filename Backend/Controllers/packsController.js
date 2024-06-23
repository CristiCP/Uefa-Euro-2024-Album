const {getAllPlayers} = require('../Controllers/playersController');

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

async function getPlayersPack(selectedPack) {
  if(selectedPack === 'Common Pack') {
    const players = await selectRandomPlayers(5);
    return players;
  }
  else if(selectedPack === 'Rare Pack') {
    const players = await selectRandomPlayers(10);
    return players;
  }
  else if(selectedPack === 'Legendary Pack') {
    const players = await selectRandomPlayers(15);
    return players;
  }
}

module.exports = { getPlayersPack};