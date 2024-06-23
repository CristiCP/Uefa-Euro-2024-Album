const express = require('express');
const bodyParser = require('body-parser');
const {getAllGroupsAndTeams} = require('../Controllers/teamsController')
const { getAllPlayers } = require('../Controllers/playersController');
const {getPlayersPack} = require('../Controllers/packsController');

const router = express.Router();
router.use(bodyParser.json());

router.get('/groups&teams', async function (req, res) {
    const teams = await getAllGroupsAndTeams();
    res.json(teams);
  });

router.get('/players', async function (req, res) {
  const players = await getAllPlayers();
  res.json(players);
});

router.post('/openPack',async function(req,res) {
  const selectedPack = req.body.selectedPack;
  const players = await getPlayersPack(selectedPack);
  res.json(players);
});

module.exports = router;
