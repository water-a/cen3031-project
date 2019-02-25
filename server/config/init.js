const express = require('express'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      config = require('./config');

var app = express();

// Logs requests sent to server
app.use(morgan('dev'));

// Example route
app.use('/api', require('../routes/example.server.routes.js'));

// Open up and listen to port listed in config file
app.listen(config.port, () => {
    console.log('Launched backend on http://localhost:3001');
});