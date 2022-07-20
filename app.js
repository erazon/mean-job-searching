const express = require('express');
const path = require('path');
require('dotenv').config();
require('./data/db');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = app.listen(process.env.PORT, function(){
    console.log('Server running on port', server.address().port);
});

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use('/', express.static(path.join(__dirname, process.env.DIR_PUBLIC)));
app.use('/api', routes);
app.use((req, res)=>{
    res.status(parseInt(process.env.STATUS_NOT_FOUND)).json({message: process.env.MSG_RESOURCE_NOT_FOUND});
});