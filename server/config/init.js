const express = require('express'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      config = require('./config'),
      bodyParser = require('body-parser'),
      fileUpload = require('express-fileupload'),
      path = require('path'),
      PayPal = require('paypal-rest-sdk');

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

// Pass build
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use(express.static(path.join(__dirname, '../../dashboard/build')));

// Pass Settings, GridFS into request + Configure PayPal with credentials
app.use(async (request, response, next) => {
    let Settings = require('../models/settings.model');
    request.settings = await Settings.findOne();
    request.bucket = bucket;

    const {sandbox, client_id, client_secret} = request.settings.paypal;
    PayPal.configure({
        mode: sandbox ? 'sandbox' : 'live',
        client_id: client_id,
        client_secret: client_secret
    });

    next();
});

// Example route
app.use('/api', require('../routes/api.routes'));

app.get('/dashboard*', (request, response) => {
    response.sendFile(path.join(__dirname, '../../dashboard/build/index.html'));
});

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// Open up and listen to port listed in config file
app.listen(config.port, console.info.bind(console, `SERVER: Launched backend on http://localhost:${config.port}`));