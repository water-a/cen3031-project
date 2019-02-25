const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let exampleSchema = new Schema({
    example: String
});

let Example = mongoose.model('Example', exampleSchema);

module.exports = Example;