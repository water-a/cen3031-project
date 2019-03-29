const Setting = require('../models/settings.model');

exports.list = (request, response) => {
    //get the options from Setting
    Setting.find({}, function(err, settings) { 
    if (err) response.status(400).send(err);
    else response.status(200).json(settings);
    })
}
exports.post = (request, response) => {
    //nothing, just an example and saves settings initially
    var setting = new Setting(request.body);
    setting.save(function (err) {
       if (err) {
           console.log(err);
           response.status(400).send(err);
       }
       else {
           //redirect?
       }
   })
   response.send("yeet");
}