const mongoose = require('mongoose'),
      Order = require('../models/orders.model'),
      Setting = require('../models/settings.model');

exports.create = async (request, response) => {
    let settings;
    let order = new Order(request.body);
    try {
        settings = await Setting.findOne();
    }
    catch (error) {
        console.log(error);
    }
    console.log(settings);
    console.log(order.size);
    console.log(settings.size[0]);//compare sizes together
    if (settings.material.indexOf(order.material) >= 0) {
        response.send('yeet');
    }
    else {
        response.send('lol');
    }
    //create new order in the db after validating all options, redirect to /checkout

    // Setting.find({}, function(err, settings) { 
    //     if (err) response.status(400).send(err);
    //     else {
    //         setting = settings;
    //         var order = new Order(request.body);
    //         for (var i = 0; i < setting.length; i++) {
    //             if ((order.material == setting[i].material) && (order.size.height == setting[i].size.height) && (order.size.width == setting[i].size.width)) {
    //                 console.log("hello");
    //                 order.save(function (err) {
    //                     if (err) response.status(400).send(err);
    //                     else {
    //                         // response.status(200).send("ok");
    //                         // return;
    //                     }
    //                 })
    //                 response.status(200).send("ok");
    //                 return;
    //             }
    //             else if (i == setting.length - 1) {
    //                 response.status(400).send("size and or material not ok");
    //                 return;
    //             }
    //         }
    //     }
    // })
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