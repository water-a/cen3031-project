const mongoose = require('mongoose'),
      Order = require('../models/orders.model'),
      Setting = require('../models/settings.model');

exports.create = (request, response) => {
    var setting;
    //create new order in the db after validating all options, redirect to /checkout
    Setting.find({}, function(err, settings) { 
        if (err) response.status(400).send(err);
        else {
            setting = settings;
            console.log(setting[0].material);
            var order = new Order(request.body);
            console.log(order.material);
            for (var i = 0; i < setting.length; i++) {
                console.log(order.material);
                console.log(order.size.height);
                console.log(setting[i]);
                if ((order.material == setting[i].material) && (order.size.height == setting[i].size.height) && (order.size.width == setting[i].size.width)) {
                    console.log("hello");
                    order.save(function (err) {
                        if (err) response.status(400).send(err);
                        else {
                            response.status(200).send("ok");
                        }
                    })
                }
            }
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
/* exports.delete = (request, response) => {
//     remove db entry upon refund of purchase
//     Order.findByIdAndDelete({Id: req.params._id}, function(err){
//         if(err) response.status(400).send(err);
//         else response.status(200)
//     })
 }
 */

exports.read = (request, response) => {
    Order.findById(request.params.orderId, function(err, order) {
        if (err) response.status(400).send(err);
        else response.status(200).json(order);
    })
}

exports.update = (request, response) => {

    //update order in case of alter in order after it has been processed

    Order.findByIdAndUpdate(request.params.orderId, request.body, function(err){
        if(err) response.status(400).send(err);
        else response.status(200).send("ok");
    })    
}

exports.complete = (request, response) => {
    //Also to use to update whether the order has been completed, update the boolean to "True" on complete
    Order.findByIdAndUpdate(request.params.orderId, {completed: true}, function(err){
        if(err) response.status(400).send(err);
        else response.status(200).send("ok");
    })
}

exports.refund = (request, response) => {
    //If the customer refunds
    Order.findByIdAndUpdate(request.params.orderId, {Refund: true}, function(err){
        if(err) response.status(400).send(err);
        else response.status(200).send("ok");
    })
}

exports.orderByID = (request, response, next, id) => {
    Order.findById(id).exec(function(err, order) {
        if (err) response.status(400).send(err);
        else {
            request.order = order;
            next();
        }
    });
}

getEstimate = (material, size) =>{
    //Estimate the price based on the size and materials given from the customer
    return 50
}