const mongoose = require('mongoose'),
      Order = require('../models/orders.model'),
      Setting = require('../models/settings.model');

exports.create = (request, response) => {
    //create new order in the db after validating all options, redirect to /checkout
    var order = new Order(req.body);
    order.save(function (err) {
        if (err) {
            console.log(err);
            resizeBy.status(400).send(err);
        }
        else {
            //redirect?
        }
    })
}
exports.list = (request, response) => {
    
    response.send("hello");
}
exports.paypal = (request, response) => {
    //redirect to paypal
    response.send("paypal.com");
}
exports.listorders = (request, response) => {
    //list all the orders
    Order.find({}, function(err, orders) {
        if (err) response.status(400).send(err);
        else response.status(200).json(orders);
    })
}
exports.delete = (request, response) => {
    //remove db entry upon refund of purchase
}
exports.update = (request, response) => {
    //update order in case of alterin order after it has been processed
}