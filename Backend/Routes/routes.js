const express = require('express');
const bodyParser = require('body-parser');
const {getAllGroupsAndTeams} = require('../Controllers/teamsController')
const {getAllPlayers,getPlayersForUser,getPlayersDetailsForUser} = require('../Controllers/playersController');
const {getPlayersPack} = require('../Controllers/packsController');
const {getLiveStandings} = require('../Controllers/liveStandingsControllers');
const {register, login, validateToken, verifyAccount} = require('../Controllers/loginController');
const {getAllTransfers, postTransfer, createExchangeOffer, getAllExchangeOffers, acceptOffer} = require('../Controllers/transferMarketController');

const router = express.Router();
router.use(bodyParser.json());

const setupRoutes = (io) => {
router.get('/groups&teams', async function (req, res) {
    const teams = await getAllGroupsAndTeams();
    res.json(teams);
  });

router.get('/players', async function (req, res) {
  const players = await getAllPlayers();
  res.json(players);
});

router.get('/user/players', getPlayersForUser);

router.get('/user/players/details', getPlayersDetailsForUser);

router.post('/openPack',async function(req,res) {
  const selectedPack = req.body.selectedPack;
  const token = req.headers.authorization;
  const players = await getPlayersPack(selectedPack,token);
  res.json(players);
});

router.get('/liveStandings',async function(req,res) {
  const standings = await getLiveStandings();
  res.json(standings);
});

router.get('/transfers', async (req, res) => {
  const token = req.headers.authorization;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const transfers = await getAllTransfers(token,page, limit);
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/createTransfer', function (req, res) {
  postTransfer(req, res, io);});

router.post('/createOffer', (req, res) => {
    createExchangeOffer(req, res);
  });

router.get('/exchangeOffers', async (req, res) => {
  const token = req.headers.authorization;
  try {
    const exchangeOffers = await getAllExchangeOffers(token);
    res.json(exchangeOffers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/acceptOffer', async (req, res) => {
  const { token, offeredUsername, playerOfferingId, playerOfferedId, exchangeId } = req.body;

  try {
    const result = await acceptOffer(token, offeredUsername, playerOfferingId, playerOfferedId, exchangeId);
    res.status(200).json({ success: true, message: 'Offer accepted successfully' });
  } catch (error) {
    console.error('Error accepting offer:', error.message);
    res.status(500).json({ success: false, error: 'Failed to accept offer' });
  }
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

return router;
};

module.exports = setupRoutes;
