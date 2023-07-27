const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const server = express();

// Routers
const loginRouter = require('./routes/loginRouter');
const charRouter = require('./routes/charRouter');
const favRouter = require('./routes/favRouter');

server.use(express.json());
server.use(morgan('dev'));
server.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

server.use("/rickandmorty/login", loginRouter);
server.use("/rickandmorty/character", charRouter);
server.use("/rickandmorty/fav", favRouter);
//server.use("/rickandmorty", router);

module.exports = server;