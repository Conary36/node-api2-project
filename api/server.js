const express = require('express');
const dbRouter = require('../db/db-router')
const server = express();


server.use(express.json());

server.get('/', (req, res)=>{
    
    res.status(200).json({'message': 'working'})
})
server.use('/api/db', dbRouter);

module.exports = server;