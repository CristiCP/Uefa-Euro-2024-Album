const express = require('express');
const router = require('../Backend/Routes/routes');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');

var app = express();
const server = http.createServer(app);
const io = socketIo(server, {
   cors: {
     origin: 'http://localhost:5173',
     methods: ['GET', 'POST'],
     allowedHeaders: ['my-custom-header'],
     credentials: true  
   }
 });

app.use(cors());
app.use('/', router(io));

io.on('connection', (socket) => {
   console.log('A user connected');
   socket.on('disconnect', () => {
     console.log('User disconnected');
   });
 });

 const PORT = process.env.PORT || 8000;
 server.listen(PORT, () => {
   console.log(`Server running at http://127.0.0.1:${PORT}`);
 });
 
