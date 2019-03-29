const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let settingSchema = new Schema({
    materials: [String],
    sizes: [{
        name: String,
        height: Number,
        width: Number
    }],
    maxSize: {
        height: Number,
        width: Number
    },
    active: Boolean,
    paypal: {
        sandbox: Boolean,
        client_id: String,
        client_secret: String
    }
});

let Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;