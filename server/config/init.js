const express = require('express'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      config = require('./config'),
      bodyParser = require('body-parser'),
      fileUpload = require('express-fileupload');

mongoose.connect(config.db.uri, {useNewUrlParser: true});

const connection = mongoose.connection;

let bucket;
connection.once('open', () => {
    console.log('DATABASE: Connected to the database.');
    bucket = new mongoose.mongo.GridFSBucket(connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'images'
    });
});
connection.on('error', console.error.bind(console, 'DATABASE [error]: '))

var app = express();

// Parse post data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// File upload middleware
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// Logs requests
app.use(morgan('dev'));

// Pass Settings, GridFS into request
app.use(async (request, response, next) => {
    let Settings = require('../models/settings.model');
    request.settings = await Settings.findOne();
    request.bucket = bucket;
    next();
});

// Example route
app.use('/api', require('../routes/api.routes'));
app.use('/ipn', require('../routes/ipn.routes'));

// Open up and listen to port listed in config file
app.listen(config.port, console.info.bind(console, 'SERVER: Launched backend on http://localhost:3001'));