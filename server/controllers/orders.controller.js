const mongoose = require('mongoose'),
      Order = require('../models/orders.model'),
      fs = require('fs'),
      PayPal = require('paypal-rest-sdk');

getEstimate = (material, size) =>{
    //Estimate the price based on the size and materials given from the customer
    return 50;
}

const isInteger = value => {
    let x;
    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}

exports.create = async (request, response) => {    
    if (!(isInteger(request.body.height) && isInteger(request.body.width))){
        response.status(400).json({
            status: 'fail',
            message: 'Height or width is not a number!'
        });
    }

    PayPal.payment.create({
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        },
        transactions: [{
            item_list: {
                items: [{
                    name: `${request.body.height}x${request.body.width} ${request.body.material} print`,
                    price: getEstimate().toFixed(2),
                    currency: "USD",
                    quantity: 1
                }]
            },
            amount: {
                currency: "USD",
                total: getEstimate().toFixed(2)
            },
            description: `This is for a ${request.body.height}x${request.body.width} ${request.body.material} print!`
        }]
    }, (error, payment) => {
        if (!error) {
            let links = {};

            payment.links.forEach(link => {
                links[link.rel] = link.href;
            });

            let redirectUrl = payment.links.find(link => link.rel == 'approval_url');
            if (redirectUrl){
                let image = request.files.image;
                let uploadStream = request.bucket.openUploadStream(image.name, {
                    metadata: {
                        contentType: image.mimetype
                    }
                });
                fs.createReadStream(image.tempFilePath)
                    .pipe(uploadStream)
                    .on('error', error => {
                        response.status(400).json({
                            status: 'error',
                            message: 'There was an error uploading your image!'
                        });
                    })
                    .on('finish', () => {
                        new Order({
                            image: mongoose.Types.ObjectId(uploadStream.id),
                            material: request.body.material,
                            size: {
                                height: request.body.height,
                                width: request.body.width
                            },
                            paypalToken: payment.id 
                        }).save((error) => {
                            if (error){
                                response.status(400).json({
                                    status: 'error',
                                    message: 'There was an error placing your order!'
                                });
                            } else {
                                response.status(200).json({
                                    status: 'success',
                                    response: {
                                        redirectUrl: redirectUrl.href
                                    }
                                });
                            }
                        });
                    });
            } else {
                error = 'No PayPal payment URL present!'
            }
        }
        if (error){
            response.status(400).json({
                status: 'error',
                response: 'There was an error producing a payment link for you. ' + error
            });
        }
    });
}

exports.download = (request, response) => {
    Order.findById(request.params.orderId, async (error, order) => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: 'Failed to retrieve order! ' + error
            });
        } else {
            let files = await mongoose.connection.db.collection('images.files');
            let file = await files.find({_id: order.image}).project({filename: 1, metadata: 1}).toArray();

            response.set('Content-Type', file[0].metadata.contentType);
            response.set('Accept-Ranges', 'bytes');
            response.set('Content-Disposition', `attachment; filename="${file[0].filename}"`);

            let downloadStream = request.bucket.openDownloadStream(mongoose.Types.ObjectId(order.image));

            downloadStream.on('data', chunk => {
                response.write(chunk);
            });
            downloadStream.on('error', error => {
                response.sendStatus(400).json({
                    status: 'error',
                    message: 'Failed to retrieve image! ' + error
                });
            });
            downloadStream.on('end', () => {
                response.end();
            });
        }
    });
}

exports.list = (request, response) => {
    Order.find({}, function(error, orders) {
        if (error){
            response.status(400).json({
                status: 'error',
                message: 'Failed to retrieve orders! ' + error
            });
        } else {
            response.status(200).json(orders);
        }
    });
}

exports.read = (request, response) => {
    Order.findById(request.params.orderId, function(error, order) {
        if (error){
            response.status(400).json({
                status: 'error',
                message: 'Failed to retrieve order! ' + error
            });
        } else {
            response.status(200).json(order);
        }
    })

exports.update = (request, response) => {
    Order.findByIdAndUpdate(request.params.orderId, request.body, function(error){
        if (error){
            response.status(400).json({
                status: 'error',
                message: 'Failed to update order! ' + error
            });
        } else {
            response.status(200).json(orders);
        }
    })    
}

exports.capture = (request, response) => {
    const {paymentId, payerId} = request.body;
    PayPal.payment.execute(paymentId, payerId, (error, payment) => {
        if (!error){
            if (payment.state === 'approved' && 
            payment.transactions &&
            payment.transactions[0].related_resources && 
            payment.transactions[0].related_resources[0].order){
                let order = payment.transactions[0].related_resources[0].order.id;
                console.log(payment);
            } else {
                error = 1;
            }
        }
        if (error){
            response.status(400).json({
                status: 'error',
                message: 'Failed to capture payment!'
            });
        }
    });
}