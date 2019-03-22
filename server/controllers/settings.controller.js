const mongoose = require('mongoose'),
    Setting = require('../models/settings.model');

exports.options = (request, response) => {
    //get the options from Setting
    response.send("settings");
}
exports.post = (request, response) => {
    //nothing, just an example
    console.log(request.body);
    response.send("post request");
}