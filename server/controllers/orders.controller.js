const mongoose = require('mongoose'),
      Order = require('../models/orders.model'),
      fs = require('fs');

getEstimate = (material, size) =>{
    //Estimate the price based on the size and materials given from the customer
    return 50;
}

exports.create = async (request, response) => {     
    let image = request.files.image;
    console.log(image);
    let uploadStream = request.bucket.openUploadStream(image.name, {
        metadata: {
            contentType: image.mimetype
        }
    });
    fs.createReadStream(image.tempFilePath)
        .pipe(uploadStream)
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
            let file = await files.find({
                _id: order.image
            }).project({
                filename: 1,
                metadata: 1 
            }).toArray();
            let downloadStream = request.bucket.openDownloadStream(mongoose.Types.ObjectId(order.image));
            response.set('content-type', file[0].metadata.contentType);
            response.set('accept-ranges', 'bytes');
            response.set('Content-Disposition', `attachment; filename="${file[0].filename}"`)
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
}
exports.list = (request, response) => {
    Order.find({}, function(err, orders) {
        if (err) response.status(400).send(err);
        else response.status(200).json(orders);
    })
}

exports.read = (request, response) => {
    Order.findById(request.params.orderId, function(err, order) {
        if (err) response.status(400).send(err);
        else response.status(200).json(order);
    })
}

exports.update = (request, response) => {
    Order.findByIdAndUpdate(request.params.orderId, request.body, function(err){
        if(err) response.status(400).send(err);
        else response.status(200).send("ok");
    })    
}


