const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let settingSchema = new Schema({
    material: [String],
    size: [{
        height: Number,
        width: Number
    }],
    active: Boolean,
    paypal: String
}, {timestamps: true});

let Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;