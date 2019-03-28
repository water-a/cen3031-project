const mongoose = require('mongoose'),
      Order = require('../models/orders.model'),
      Setting = require('../models/settings.model'),
      path = require('path'),
      { Readable } = require('stream'),
      fs = require('fs');

exports.create = async (request, response) => {     
    let responseBody = {
        status: 'success|fail|error',
        response: "message|object"
    }


    let settings;

    let image = request.files.image;
    console.log(image);
    let uploadStream = request.bucket.openUploadStream(image.name, {
        metadata: {
            contentType: image.mimetype
        }
    });
    let imageStream = new Readable();
    imageStream.push(image.data);
    imageStream.push(null);
    imageStream.pipe(uploadStream)
        .on('error', function(error) {
            assert.ifError(error);
        })
        .on('finish', function() {
            let order = new Order({
                image: mongoose.Types.ObjectId(uploadStream.id),
                material: request.body.material,
                size: {
                    height: request.body.height,
                    width: request.body.width
                }
            });
            order.save(function (err) {
                if (err) response.status(400).send(err);
                else response.status(200).send("ok");
            });
        });
}

exports.download = (request, response) => {
    Order.findById(request.params.orderId, async (err, order) => {
        if (err) response.status(400).send(err);
        else {
            let files = await mongoose.connection.db.collection('images.files');
            let metadata = await files.find({
                _id: order.image
            }).project({
               metadata: 1 
            }).toArray();
            let downloadStream = request.bucket.openDownloadStream(order.image);
            console.log(downloadStream);
            response.set('content-type', metadata.contentType);
            response.set('accept-ranges', 'bytes');
            downloadStream.on('data', (chunk) => {
                response.write(chunk);
            });
            downloadStream.on('error', () => {
                response.sendStatus(400);
            });
            downloadStream.on('end', () => {
                response.end();
            });
        }
    })
    //response.send("hi");
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