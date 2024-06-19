const express = require('express');
const bodyParser = require('body-parser');
const { fetchTeams, getTeamsName } = require('./teams-api');
const { getPlayersCommonPack,getPlayersRarePack,getPlayersLegendaryPack } = require('./players');

const router = express.Router();
let teamsFetched = false; 

router.use(bodyParser.json());

router.use(async function(req, res, next) {
  try {
    if (!teamsFetched) {
      await fetchTeams();
      teamsFetched = true; 
    }
    next();
  } catch (err) {
    console.error('Error fetching teams:', err);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

router.get('/teams', function (req, res) {
  const teams = getTeamsName();
  res.json(teams);
});

router.post('/openPack',async function(req,res) {
  const selectedPack = req.body.selectedPack;
  console.log(selectedPack);
  if(selectedPack === 'Common Pack') {
    const players = await getPlayersCommonPack();
    res.json(players);
  }
  else if(selectedPack === 'Rare Pack') {
    const players = await getPlayersRarePack();
    res.json(players);
  }
  else if(selectedPack === 'Legendary Pack') {
    const players = await getPlayersLegendaryPack();
    res.json(players);
  }
  
});

module.exports = router;
