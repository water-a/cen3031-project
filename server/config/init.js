const express = require('express'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      config = require('./config'),
      bodyParser = require('body-parser'),
      fileUpload = require('express-fileupload'),
      path = require('path'),
      PayPal = require('paypal-rest-sdk'),
      auth = require('../controllers/auth.controller'),
      sanitize = require('mongo-sanitize');

mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useFindAndModify: false
});

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

// Sanitize input to prevent NoSQL injection
app.use((request, response, next) => {
    request.body = sanitize(request.body);
    next();
});

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
    let defaultSettings = require('./default.setting.json');
    request.settings = await Settings.findOne();
    if (request.settings === null){
        new Settings(defaultSettings).save();
        request.settings = defaultSettings;
    }
    request.bucket = bucket;

    const {sandbox, client_id, client_secret} = request.settings.paypal;
    PayPal.configure({
        mode: sandbox ? 'sandbox' : 'live',
        client_id: client_id,
        client_secret: client_secret
    });

    next();
});

app.use('/api', require('../routes/api.routes'));

app.get('/dashboard*', auth.check, (request, response) => {
    response.sendFile(path.join(__dirname, '../../dashboard/build/index.html'));
});

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// Open up and listen to port listed in config file
app.listen(config.port, console.info.bind(console, `SERVER: Launched backend on http://localhost:${config.port}`));