const express = require('express'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      config = require('./config'),
      bodyParser = require('body-parser'),
      fs = require('fs'),
      path = require('path'),
      Grid = require('gridfs-stream');

mongoose.connect(config.db.uri, {useNewUrlParser: true});

const connection = mongoose.connection;

let bucket;

connection.once('open', () => {
    console.log('DATABASE: Connected to the database.');
    bucket = new mongoose.mongo.GridFSBucket(connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'images'
    });
    // if (gridfs) {
    //     var streamwrite = gridfs.createWriteStream({
    //         filename: "test.txt"
    //     });
    //     fs.createReadStream(file).pipe(streamwrite);
    //     streamwrite.on("close", function (file) {
    //         console.log("written");
    //     });
    // } else console.log("no grid");
});
connection.on('error', console.error.bind(console, 'DATABASE [error]: '))

var app = express();

// Parse post data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Logs requests
app.use(morgan('dev'));

// Pass GridFS into request
app.use((request, response, next) => {
    request.bucket = bucket;
    next();
});

// Example route
app.use('/api', require('../routes/api.routes'));

// Open up and listen to port listed in config file
app.listen(config.port, console.info.bind(console, 'SERVER: Launched backend on http://localhost:3001'));