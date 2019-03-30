const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let orderSchema = new Schema({
    contact: {
        phone: String,
        firstName: String,
        lastName: String,
        email: String,
    },
    cost: mongoose.Types.Decimal128,
    material: String,
    size: {
        height: Number,
        width: Number
    },
    shippingAddress: {
        addrLine1: String,
        addrLine2: String
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