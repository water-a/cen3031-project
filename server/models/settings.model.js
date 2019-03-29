const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let settingSchema = new Schema({
    material: [String],
    size: [{
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
}, { 
    capped: {
        size: 1024, 
        max: 1
    } 
});

let Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;