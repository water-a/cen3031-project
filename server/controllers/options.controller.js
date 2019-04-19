const Setting = require('../models/settings.model');

exports.list = (request, response) => {
    response.status(200).json({
        status: 'success',
        response: {
            sizes: request.settings.sizes,
            materials: request.settings.materials,
            maxSize: request.settings.maxSize,
            content: request.settings.content
        }
    });
}

exports.materials = {}
exports.materials.add = (request, response) => {
    let material = request.params.material;
    let costPerArea = request.body.costPerArea;

    Setting.findOneAndUpdate(
        {},
        {
            $push: {
                materials: {
                    name: material,
                    costPerArea
                }
            }
        }
    ).exec((error) => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: error.message
            });
        } else {
            response.status(200).json({
                status: 'success'
            });
        }
    });
}
exports.materials.delete = (request, response) => {
    let material = request.params.material;
    Setting.findOneAndUpdate(
        {}, 
        { 
            $pull: {
                materials: {
                    _id: material
                }
            }
        }
    ).exec((error) => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: error.message
            });
        } else {
            response.status(200).json({
                status: 'success'
            });
        }
    });
}

exports.sizes = {}
exports.sizes.setMax = (request, response) => {
    let height = request.body.height;
    let width = request.body.width;

    Setting.findOneAndUpdate(
        {},
        {
            $set: {
                maxSize: {
                    height,
                    width
                }
            }
        }
    ).exec((error) => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: error.message
            });
        } else {
            response.status(200).json({
                status: 'success'
            });
        }
    });
}
exports.sizes.add = (request, response) => {
    let height = request.params.height;
    let width = request.params.width;

    Setting.findOneAndUpdate(
        {},
        {
            $push: {
                sizes: {
                    height,
                    width
                }
            }
        }
    ).exec((error) => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: error.message
            });
        } else {
            response.status(200).json({
                status: 'success'
            });
        }
    });
}
exports.sizes.delete = (request, response) => {
    let height = request.params.height;
    let width = request.params.width;

    Setting.findOneAndUpdate(
        {}, 
        { 
            $pull: {
                sizes: {
                    height,
                    width
                }
            }
        }
    ).exec(error => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: error.message
            });
        } else {
            response.status(200).json({
                status: 'success'
            });
        }
    });
}

exports.content = {}
exports.content.update = (request, response) => {
    let name = request.params.name;
    let content = request.body.content;

    if (!(name == 'faq' || name == 'about')){
        response.status(400).json({
            status: 'fail',
            message: 'Not valid content'
        });
    }

    let contentObject = request.settings.content;
    contentObject[name] = content;

    Setting.findOneAndUpdate(
        {},
        {
            $set: {
                content: contentObject
            }
        }
    ).exec(error => {
        if (error){
            response.status(400).json({
                status: 'error',
                message: error.message
            });
        } else {
            response.status(200).json({
                status: 'success'
            });
        }
    });
}