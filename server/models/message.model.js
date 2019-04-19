const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let messageSchema = new Schema({
    email: {
        required: true,
        type: String
    },
    orderId: String,
    issue: {
        required: true,
        type: String
    },
}, {timestamps: true});

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;