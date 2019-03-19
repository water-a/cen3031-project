const express = require('express'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      config = require('./config');

mongoose.connect(config.db.uri, {useNewUrlParser: true});

const db = mongoose.connection;
db.once('open', console.info.bind(console, 'DATABASE: Successfully connected to database!'));
db.on('error', console.error.bind(console, 'DATABASE [error]: '))
    
var app = express();

// Logs requests
app.use(morgan('dev'));

// Example route
app.use('/api', require('../routes/api.routes'));

// Open up and listen to port listed in config file
app.listen(config.port, console.info.bind(console, 'SERVER: Launched backend on http://localhost:3001'));