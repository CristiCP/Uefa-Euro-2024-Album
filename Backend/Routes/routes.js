const express = require('express');
const bodyParser = require('body-parser');
const {getAllGroupsAndTeams} = require('../Controllers/teamsController')
const { getAllPlayers } = require('../Controllers/playersController');
const {getPlayersPack} = require('../Controllers/packsController');
const {getLiveStandings} = require('../Controllers/liveStandingsControllers');
const {register, login, validateToken, verifyAccount} = require('../Controllers/loginController');

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

router.get('/liveStandings',async function(req,res) {
  const standings = await getLiveStandings();
  res.json(standings);
});

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const result = await register(username, password, email);
  if (result.success) {
      res.status(201).send(result.message);
  } else {
      res.status(400).send(result.message);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const loginResult = await login(username, password);
  if (loginResult.success) {
      res.status(200).json(loginResult);
  } else {
      res.status(200).json(loginResult);
  }
});

router.post('/validate', validateToken);

router.get('/verify', verifyAccount);

module.exports = router;
