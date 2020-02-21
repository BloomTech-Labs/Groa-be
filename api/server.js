const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/docs', express.static('./docs'));
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.status(200).json('Welcome to the Backend of Groa');
});

module.exports = server;