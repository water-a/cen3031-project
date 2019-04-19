const Message = require('../models/message.model');

exports.list = (request, response) => {
    Message.find().sort('-createdAt').lean().exec((error, messages) => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: error.message
            });
        } else {
            messages.map(message => {
                message.id = message._id;
                delete message.__v;
                delete message._id;
                return message;
            });
            response.status(200).json({
                status: 'success',
                response: messages
            });
        }
    });
}
exports.post = (request, response) => {
    if ('orderId' in request.body){
        request.body.orderId = request.body.orderId.trim();
    }
    if ('issue' in request.body){
        request.body.issue = request.body.issue.trim();
    }
    new Message(request.body).save((error, message) => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: error.message
            });
        } else {
            response.status(200).json({
                status: 'success',
                message: 'Successfully sent message!'
            });
        }
    });
}