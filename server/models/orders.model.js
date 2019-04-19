const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let orderSchema = new Schema({
    contact: {
        firstName: String,
        lastName: String,
        email: String,
    },
    cost: Number,
    material: {
        name: String,
        costPerArea: Number
    },
    size: {
        height: Number,
        width: Number
    },
    shippingAddress: {
        line1: String,
        line2: String,
        city: String,
        state: String,
        postal: String,
        country: String
    },
    status: {
        type: Number,
        default: 0
    },
    image: Schema.Types.ObjectId,
    paypalToken: String
}, {timestamps: true});

let Order = mongoose.model('Order', orderSchema);

module.exports = Order;