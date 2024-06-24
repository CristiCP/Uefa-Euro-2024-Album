const express = require('express');
const router = require('../Backend/Routes/routes');
const cors = require('cors');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/', router);

var server = app.listen(8000, function () {
   console.log("Server running at http://127.0.0.1:8000");
})
