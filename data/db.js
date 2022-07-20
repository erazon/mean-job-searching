const mongoose = require('mongoose');
require('./job-opening.model');

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('connected', function(){
    console.log('MongoDB connected to', process.env.DB_URL);
});

mongoose.connection.on('disconnected', function(){
    console.log('mongodb disconnected');
});

mongoose.connection.on('error', function(err){
    console.log('mongodb connection error', err);
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('mongodb connection closed by app termination');
        process.exit(0);
    });
});

process.once('SIGUSR2', function(){
    mongoose.connection.close(function(){
        process.kill(process.pid, 'SIGUSR2');
        console.log('mongodb connection closed by app restart');
    })
})