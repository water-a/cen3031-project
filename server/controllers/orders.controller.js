const mongoose = require('mongoose'),
      Order = require('../models/orders.model'),
      fs = require('fs'),
      PayPal = require('paypal-rest-sdk');

getEstimate = (height, width, material) =>{
    return height * width * material.costPerArea;
}

const isInteger = value => {
    let x;
    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}

exports.create = async (request, response) => {  
    let baseUrl = request.get('origin');
    let materials = request.settings.materials;

    let {material, height, width} = request.body;
    if (!(isInteger(height) && isInteger(width))){
        response.status(400).json({
            status: 'fail',
            message: 'Height or width is not a number!'
        });
    }
    
    material = materials.find((value) => value.name == material);
    if (!material){
        response.status(400).json({
            status: 'fail',
            message: 'Invalid material!'
        });
    }

    let cost = getEstimate(height, width, material);

    let image = request.files.image;
    let uploadStream = request.bucket.openUploadStream(image.name, {
        metadata: {
            contentType: image.mimetype
        }
    });

    PayPal.payment.create({
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: `${baseUrl}/success`,
            cancel_url: baseUrl
        },
        transactions: [{
            item_list: {
                items: [{
                    name: `${height}x${width} ${material.name} print`,
                    price: cost.toFixed(2),
                    currency: "USD",
                    quantity: 1
                }]
            },
            amount: {
                currency: "USD",
                total: cost.toFixed(2)
            },
            description: `This is for a ${height}x${width} ${material.name} print!`
        }]
    }, (error, payment) => {
        if (!error) {
            let links = {};

            payment.links.forEach(link => {
                links[link.rel] = link.href;
            });

            let redirectUrl = payment.links.find(link => link.rel == 'approval_url');
            if (redirectUrl){
                fs.createReadStream(image.tempFilePath)
                    .pipe(uploadStream)
                    .on('finish', () => {
                        new Order({
                            image: mongoose.Types.ObjectId(uploadStream.id),
                            material: material,
                            size: {
                                height: height,
                                width: width
                            },
                            paypalToken: payment.id 
                        }).save();
                    });
                response.status(200).json({
                    status: 'success',
                    response: {
                        redirectUrl: redirectUrl.href
                    }
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

exports.view = (request, response) => {
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
            if ('download' in request.query){
                response.set('Content-Disposition', `attachment; filename="${file[0].filename}"`);
            }

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
    Order.find().sort('-createdAt').lean().exec((error, orders) => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: 'Failed to retrieve orders! ' + error
            });
        } else {
            orders.map(order => {
                order.id = order._id;
                delete order.__v;
                delete order._id;
                return order;
            });
            response.status(200).json(orders);
        }
    });
}

exports.read = (request, response) => {
    Order.findById(request.params.orderId).lean().exec((error, order) => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: 'Failed to retrieve order! ' + error
            });
        } else {
            order.id = order._id;
            delete order._id;
            delete order.__v;
            response.status(200).json(order);
        }
    })
}

exports.update = (request, response) => {
    Order.findByIdAndUpdate(request.params.orderId, request.body, { new: true }, (error, order) => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: 'Failed to update order! ' + error
            });
        } else {
            response.status(200).json(order);
        }
    })    
}

exports.capture = (request, response) => {
    const {paymentId, payerId} = request.body;
    PayPal.payment.execute(paymentId, { 'payer_id': payerId }, (error, payment) => {
        if (!error){
            if (payment.state === 'approved'){
                let token = payment.id;
                let payer = payment.payer.payer_info;
                Order.findOneAndUpdate(
                    { paypalToken: token }, 
                    { 
                        $set: {
                            status: 1,
                            contact: {
                                firstName: payer.first_name,
                                lastName: payer.last_name,
                                email: payer.email
                            },
                            shippingAddress: {
                                line1: payer.shipping_address.line1,
                                line2: payer.shipping_address.line2,
                                city: payer.shipping_address.city,
                                state: payer.shipping_address.state,
                                postal: payer.shipping_address.postal_code,
                                country: payer.shipping_address.country_code
                            }
                        }
                    },
                    { new: true }
                ).exec((err, order) => {
                    if (err){
                        error = 1;
                    } else if (order) {
                        order = order.toObject();
                        order.preview = `/api/orders/${order._id}/preview`
                        delete order.image;                        
                        delete order._id;
                        delete order.__v;
                        delete order.paypalToken;
                        delete order.createdAt;
                        delete order.updatedAt;
                        delete order.status;
                        response.status(200).json(order);
                    }
                });
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
