const mongoose = require('mongoose'),
      Order = require('../models/orders.model'),
      Setting = require('../models/settings.model'),
      fs = require('fs');

exports.create = async (request, response) => {
    let settings;
    let order = new Order(request.body);
    try {
        settings = await Setting.findOne();
    }
    catch (error) {
        console.log(error);
    }
    var index = settings.material.indexOf(order.material);
    if (index >= 0) {
        console.log(index);
        if (settings.size[index].height == order.size.height && settings.size[index].width == order.size.width) {
            order.save(function (err) {
                if (err) response.status(400).send(err);
                else response.status(200).send("ok");
            });
            fs.createReadStream('C:/Projects/cen3031-project/bird.jpeg').pipe(request.bucket.openUploadStream('bird.jpeg')).
            on('error', function(error) {
                assert.ifError(error);
            }).
            on('finish', function() {
                console.log('done');
            });
        }
        else {
            response.status(400).send('height or width do not match options');
        }
    }
    else {
        response.status(400).send('material does not match options');
    }
}
exports.list = (request, response) => {
    request.bucket.openDownloadStreamByName('bird.jpeg').
    pipe(fs.createWriteStream('./bird2.jpeg')).
    on('error', function(error) {
        assert.ifError(error);
    }).
    on('finish', function () {
        console.log('done2');
    });
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