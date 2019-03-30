const Setting = require('../models/settings.model');

exports.list = (request, response) => {
    response.status(200).json({
        status: 'success',
        response: {
            sizes: request.settings.sizes,
            materials: request.settings.materials
        }
    });
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